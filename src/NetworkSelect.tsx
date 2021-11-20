import { Select } from "@gnosis.pm/safe-react-components";
import { SelectItem } from "@gnosis.pm/safe-react-components/dist/inputs/Select";

export type Props = {
    selectedNetwork: string,
    setSelectedNetwork: (network: string) => void,
}

const NetworkSelect = ({selectedNetwork, setSelectedNetwork}: Props): React.ReactElement => {
    const items: Array<SelectItem> = [
      { id: 'mainnet', label: 'Mainnet' },
      { id: 'rinkeby', label: 'Rinkeby' },
    ];
  
    return (
      <Select
        items={items}
        activeItemId={selectedNetwork}
        onItemClick={(id) => {
            setSelectedNetwork(id);
        }}
      />
    );
  }

export default NetworkSelect;
