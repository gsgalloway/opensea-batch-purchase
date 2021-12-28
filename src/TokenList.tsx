import { Loader, Table, TableAlignment, TableRow, Text } from "@gnosis.pm/safe-react-components"
import { TokenDescription } from "./types"
import { OpenSeaPort } from "opensea-js";
import { Network, OpenSeaAsset } from "opensea-js/lib/types";
import { formatEther } from "@ethersproject/units";
import { InfuraProvider } from "@ethersproject/providers";
import { useQuery } from 'react-query';
import { backOff } from "exponential-backoff";
import _ from "lodash";

type Props = {
    tokens: Array<TokenDescription>,
    network: Network,
    apiKey: string,
}

type RowCell = {
    id?: string;
    alignment?: TableAlignment;
    content: React.ReactNode;
};

const loadTokenAssets = async (tokens: TokenDescription[], networkName: Network, apiKey?: string) => {
    const seaport = new OpenSeaPort(new InfuraProvider(), {networkName, apiKey});
    const assets = await Promise.all(tokens.map((token: TokenDescription) => {
        return backOff(() => {
            return seaport.api.getAsset({tokenAddress: token.contractAddress, tokenId: token.id.toString()})
        })
    }));
    return assets;
}

const TokenList = ({tokens, network, apiKey}: Props): React.ReactElement => {
    const { isLoading, data, error } = useQuery(['loadTokenAssets', tokens], () => loadTokenAssets(tokens, network, apiKey))
    if (isLoading) {
        return <Loader size="lg" />
    }
    if (error) {
        alert(error);
        return <></>;
    }
    if (data === undefined) {
        throw new Error("data is undefined")
    }

    const buildTableRows = (): TableRow[] => {
        return data.map((asset): TableRow => {
            return {
                id: asset.tokenId ?? "",
                cells: buildCellsForRow(asset),
            }
        })
    }

    const buildCellsForRow = (asset: OpenSeaAsset): RowCell[] => {
        const cheapestOrder = _.minBy(asset.sellOrders, (order) =>
            order.basePrice.toNumber()
        );
        return [{
            content: <Text size="lg">{asset.name}</Text>
        }, {
            content: <Text size="lg">Price: Ξ{formatEther(cheapestOrder?.basePrice.toString() ?? "-1").toString()}</Text>
        },{
            content: <img src={asset.imageUrl} alt={asset.imageUrl} />
        }];
    }

    return <>
        <Table rows={buildTableRows()} />
    </>
}

export default TokenList