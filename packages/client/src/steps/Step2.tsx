import { Card, Title, Divider, Text, Button } from "@gnosis.pm/safe-react-components"
import { capitalizeFirstLetter, NetworkConnectionInfo } from "../utils"
import { Network } from '@ethersproject/providers'
import './Step2.css'

type Props = {
    networkConnectionInfo?: NetworkConnectionInfo;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    toNextTab: () => void;
    supportedNetworks: Network[];
}

const Step2 = ({networkConnectionInfo, connect, disconnect, toNextTab, supportedNetworks}: Props): React.ReactElement => {
    const networkIsSupported = networkConnectionInfo && supportedNetworks.find(network => network.chainId === networkConnectionInfo.network.chainId)
    return (
        <Card className="card">
          <Title size="xs">Connect Web3 Provider</Title>
          {networkConnectionInfo ? (
            <div>
              <Text size="lg">Connected to: <span className="NetworkName">{capitalizeFirstLetter(networkConnectionInfo.network.name)}</span></Text>
              <Divider/>
              <Button className="CrowdedButton" size="md" onClick={disconnect}>
                Disconnect
              </Button>
              <Button disabled={!networkIsSupported} className="CrowdedButton" size="md" onClick={toNextTab}>
                  Continue
              </Button>
            </div>
          ) : (
            <Button size="md" onClick={connect}>
              Connect
            </Button>
          )}
      </Card>
    )
}

export default Step2
