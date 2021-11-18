import { TextField } from "@gnosis.pm/safe-react-components";

type Props = {
    tokenID: string,
    tokenContractAddress: string,
    onTokenIDChanged: (tokenID: string) => void,
    onTokenContractAddressChanged: (tokenContractAddress: string) => void,
};

const NFTForm = ({tokenID, tokenContractAddress, onTokenIDChanged, onTokenContractAddressChanged}: Props): React.ReactElement => {
    return <>
        <TextField
            id="standard-name"
            label="Token Contract Address"
            value={tokenContractAddress}
            onChange={(e) => onTokenContractAddressChanged(e.target.value)}
            input={{ type: 'text', pattern: "[A-Za-z]{3}" }}
        />
        <br />
        <TextField
            id="standard-name"
            label="Token ID"
            value={tokenID}
            onChange={(e) => onTokenIDChanged(e.target.value)}
            input={{ type: 'number', min: 0  }}
        />
    </>
}

export default NFTForm;
