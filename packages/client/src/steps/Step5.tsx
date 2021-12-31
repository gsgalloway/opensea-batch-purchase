import { Card, Title, Text, Button, Divider } from "@gnosis.pm/safe-react-components"

type Props = {
    onSubmitTransaction: () => void;
}

const StepFive = ({onSubmitTransaction}: Props): React.ReactElement => {
    return (
        <Card className="card">
            <Title size="xs">Build Transaction Data</Title>
            <Text size="md">This step will build the raw transaction data to effect the whole set of purchases. No transactions are signed or broadcast at this step. You can review the results in the next step.</Text>
            <Divider/>
            <Button size='md' onClick={onSubmitTransaction}>Submit</Button>
      </Card>
    )
}

export default StepFive
