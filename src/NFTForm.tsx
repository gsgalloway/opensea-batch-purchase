import { Text, TextField } from "@gnosis.pm/safe-react-components";
import styled from 'styled-components'

type Props = {
    tokenID: string,
    tokenContractAddress: string,
    onTokenIDChanged: (tokenID: string) => void,
    onTokenContractAddressChanged: (tokenContractAddress: string) => void,
};

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NFTForm = ({tokenID, tokenContractAddress, onTokenIDChanged, onTokenContractAddressChanged}: Props): React.ReactElement => {
    return <>
        <Container>
            <Text size="lg">Enter token ID (a number) and the token's contract address <br/>Ex: '0x059edd72cd353df5106d2b9cc5ab83a52287ac3a' for Artblocks</Text>
            <br />
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
        </Container>
    </>
}

export default NFTForm;
