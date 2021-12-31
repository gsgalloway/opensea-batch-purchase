import { Card, Loader, Table, TableAlignment, TableRow, Text } from "@gnosis.pm/safe-react-components"
import { TokenDescription } from "./types"
import { formatEther } from "@ethersproject/units";
import { UseQueryResult } from 'react-query';
import { OpenSeaAsset } from "opensea-js/lib/types";
import { BigNumber } from "ethers";
import './TokenList.css'
import { isForSale } from "./utils";

type Props = {
    tokenDescriptions: Array<TokenDescription>,
    tokenListings: Array<UseQueryResult<OpenSeaAsset>>,
}

type RowCell = {
    id?: string;
    alignment?: TableAlignment;
    content: React.ReactNode;
};

const TokenList = ({tokenDescriptions, tokenListings}: Props): React.ReactElement => {
    const buildTableRows = (): TableRow[] => {
        return tokenListings.map((tokenListing, idx): TableRow => {
            const token = tokenDescriptions[idx];
            return {
                id: token.id.toString(),
                cells: buildCellsForRow(token, tokenListing),
            }
        })
    }

    const buildCellsForRow = (token: TokenDescription, listing: UseQueryResult<OpenSeaAsset>): RowCell[] => {
        const {data, isLoading, isError, error} = listing;
        if (isLoading) {
            return [{
                content: <Text size="lg">Token ID: {token.id.toString()}</Text> 
            }, {
                content: <Text size="lg">Token Contract: {token.contractAddress}</Text>  
            }, {
                content: <Loader size={"sm"} />
            }]
        }
        if (isError || data === undefined) {
            console.error(error);
            return [{
                content: <Text size="lg">Token ID: {token.id.toString()}</Text> 
            }, {
                content: <Text size="lg">Token Contract: {token.contractAddress}</Text> 
            }, {
                content: <Text size="lg" color="error">Error: {(error as Error | undefined)?.message}</Text>
            }]
        }

        let priceText: JSX.Element
        if (isForSale(data)) {
            priceText = <Text size="lg">Ξ{formatEther(BigNumber.from(data.sellOrders[0].basePrice))}</Text>;
        } else {
            priceText = <Text size="lg" strong={true} color="error">Not for sale!</Text>
        }
        return [{
            content: <Text size="lg">{data.name}</Text>
        }, {
            content: priceText
        }, {
            content: <a href={data.openseaLink} target="_blank" rel="noreferrer">View on OpenSea </a>
        }, {
            content: <img src={data.imageUrl} alt={data.imageUrl} />
        }];
    }

    const sumPurchasePrices = (): string => {
        const sum = tokenListings
            .map(({data: token, isLoading, isError}) => {
                if (isLoading || isError || token === undefined) {
                    return BigNumber.from(0);
                }
                if (!isForSale(token)) {
                    return BigNumber.from(0);
                }
                return BigNumber.from(token.sellOrders[0].basePrice)
            })
            .reduce((prev, next) => prev.add(next))
        return "Ξ" + formatEther(sum)
    }

    return <>
        <Card>
            <Text size="lg">Total: {sumPurchasePrices()}</Text>
        </Card>
        <Table rows={buildTableRows()} />
    </>
}

export default TokenList