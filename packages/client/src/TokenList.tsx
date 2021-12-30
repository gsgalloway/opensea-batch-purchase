import { Loader, Table, TableAlignment, TableRow, Text } from "@gnosis.pm/safe-react-components"
import { TokenDescription } from "./types"
import { formatEther } from "@ethersproject/units";
import { Network } from "@ethersproject/providers";
import { useQueries, UseQueryResult } from 'react-query';
import { DefaultApi } from './api'
import { OpenSeaAsset, Order } from "opensea-js/lib/types";
import { BigNumber } from "ethers";
import './TokenList.css'

type Props = {
    tokens: Array<TokenDescription>,
    api: DefaultApi,
    network: Network
}

type RowCell = {
    id?: string;
    alignment?: TableAlignment;
    content: React.ReactNode;
};

const loadTokenAsset = async (token: TokenDescription, api: DefaultApi, network: Network): Promise<OpenSeaAsset> => {
    const resp = await api.getAsset(token.contractAddress, token.id.toString(), network.name as any)
    if (resp.status !== 200) {
        console.error(`Failed to fetch ${JSON.stringify(token)} with status ${resp.status}: ${resp.data}`)
        throw new Error(`Failed to fetch ${JSON.stringify(token)}`)
    }
    const sellOrders = (resp.data as OpenSeaAsset).sellOrders
    if (sellOrders) {
        sellOrders.sort((order1, order2) => {
            const [bn1, bn2] = [order1, order2].map(BigNumber.from)
            if (bn1.lt(bn2)) return -1
            if (bn1.gt(bn2)) return 1
            return 0;
        })
    }
    return resp.data as OpenSeaAsset
}

type ForSaleAsset = OpenSeaAsset & {
    sellOrders: Order[]
}

function isForSale(asset: OpenSeaAsset): asset is ForSaleAsset {
    return asset.sellOrders !== undefined && 
        asset.sellOrders !== null &&
        asset.sellOrders.length > 0;
}

const TokenList = ({tokens, api, network}: Props): React.ReactElement => {
    const results = useQueries(
        tokens.map(token => {
            return {
                queryKey: ['loadTokenAsset', token.contractAddress, token.id],
                queryFn: () => loadTokenAsset(token, api, network),
            }
        })
    )

    const buildTableRows = (): TableRow[] => {
        return results.map((result, idx): TableRow => {
            const token = tokens[idx];
            return {
                id: token.id.toString(),
                cells: buildCellsForRow(token, result),
            }
        })
    }

    const buildCellsForRow = (token: TokenDescription, queryResult: UseQueryResult<OpenSeaAsset>): RowCell[] => {
        const {data, isLoading, isError, error} = queryResult;
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
                content: <Text size="lg">Error: {(error as Error | undefined)?.message}</Text>
            }]
        }

        let priceText: JSX.Element
        if (isForSale(data)) {
            priceText = <Text size="lg">{formatEther(BigNumber.from(data.sellOrders[0].basePrice))}</Text>;
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

    return <>
        <Table rows={buildTableRows()} />
    </>
}

export default TokenList