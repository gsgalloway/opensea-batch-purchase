import { Card, Title, Divider, Text, Button } from "@gnosis.pm/safe-react-components"
import { Network } from '@ethersproject/providers';
import { capitalizeFirstLetter } from "../utils"

type Props = {
    supportedNetworks: Network[];
    toNextTab: () => void;
}

const Step1 = ({supportedNetworks, toNextTab}: Props): React.ReactElement => {
    return (
        <Card className="card">
            <Title size="xs">Introduction</Title>
            <Text size="xl">
                This app allows for creation of a single transaction to purchase multiple 
                OpenSea assets in batch from a Gnosis Safe. All purchases will
                succeed or fail in unison.
            </Text>
            <Divider/>
            <Text size="md">
                The tool uses <a href="https://www.npmjs.com/package/ethers-multisend">ethers-multisend</a> by 
                Gnosis for batching transactions
                and <a href="https://www.npmjs.com/package/@gsgalloway/opensea-js">opensea-js</a> for
                crafting individual purchase transactions.
            </Text>
            <Divider/>
            <Text size="xl">Supported networks: {
                supportedNetworks.map((network) =>
                    (<span className="NetworkName">{capitalizeFirstLetter(network.name)} </span>))
            }
            </Text>
            <Divider/>
            <Button size="md" onClick={toNextTab}>
                  Continue
            </Button>
        </Card>
    )
}

export default Step1
