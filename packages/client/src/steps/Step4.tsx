import { Card, Title, Text, AddressInput, Divider, Button } from "@gnosis.pm/safe-react-components";

type Props = {
    address: string;
    onChangeAddress: (address: string) => void;
    toNextTab: () => void;
}

const StepFour = ({address, onChangeAddress, toNextTab}: Props): React.ReactElement => {
    return (
        <Card className="card">
          <Title size="xs">Enter Gnosis Safe Address</Title>
          <Text size="xl">Enter the address of the Gnosis Safe that will process the purchase.</Text>
          <AddressInput address={address} onChangeAddress={onChangeAddress} name="address" label={"Gnosis Safe Address"}></AddressInput>
          <Divider/>
          <Button size="md" onClick={toNextTab}>
            Continue
          </Button>
      </Card>
    )
}

export default StepFour
