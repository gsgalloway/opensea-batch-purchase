import { Card, Title, Text, Loader, Accordion, AccordionDetails, AccordionSummary, Divider, IconText, Button, EthHashInfo } from "@gnosis.pm/safe-react-components"
import { BigNumber, Contract, Signer } from "ethers";
import { Web3Provider, Network } from '@ethersproject/providers';
import { signHash, calculateSafeTransactionHash } from "@gnosis.pm/safe-contracts";
import { SafeTransaction } from "../api";
import SafeServiceClient from "@gnosis.pm/safe-service-client";
import EthSafeTransaction from '@gnosis.pm/safe-core-sdk/dist/src/utils/transactions/SafeTransaction';
import { gnosisSafeABI } from '../gnosis-abi';
import { EthSignSignature } from "@gnosis.pm/safe-core-sdk";
import './Step6.css'

type Props = {
    safeTransaction: SafeTransaction | undefined,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    error: Error | undefined,
    signer: Signer,
    signerAddress: string,
    provider: Web3Provider,
    network: Network,
    safeAddress: string,
}

function loadingBody(): JSX.Element {
    return (
        <div>
            <Loader size="lg"/>
            <Text size="lg">Waiting for transaction body...</Text>
        </div>
    )
}

function errorBody(error?: Error): JSX.Element {
    return <Text size="lg" strong={true}>Error: {error?.message}</Text>
}

const Step6 = ({
    safeTransaction,
    isLoading,
    isError,
    isSuccess,
    error,
    signer,
    signerAddress,
    provider,
    network,
    safeAddress,
}: Props): React.ReactElement => {

    // The request to build the transaction hasn't been submitted yet.
    if (!isLoading && !isError && !isSuccess) {
        return <div/>
    }

    let body: JSX.Element
    if (isLoading) {
        body = loadingBody();
    }
    else if (isError) {
        body = errorBody(error);
    }
    else if (safeTransaction === undefined) {
        body = errorBody(new Error('No SafeTransaction received'))
    }
    else {
        const proposeTransaction = async (): Promise<void> => {
            try {
                const safeContract = new Contract(safeAddress, gnosisSafeABI);            
                const typedSafeTx = {
                    ...safeTransaction,
                    nonce: BigNumber.from(safeTransaction.nonce).toNumber(),
                    operation: BigNumber.from(safeTransaction.operation).toNumber(),
                }
                const safeTxHash = calculateSafeTransactionHash(safeContract, typedSafeTx, network.chainId);
                const signature = await signHash(signer, safeTxHash);
            
                let safeServiceURL = 'https://safe-transaction.gnosis.io';
                if (network.name === 'rinkeby') {
                safeServiceURL = 'https://safe-transaction.rinkeby.gnosis.io';
                }
                const safeService = new SafeServiceClient(safeServiceURL);
            
                const ethSafeTx = new EthSafeTransaction({
                    baseGas: BigNumber.from(safeTransaction.baseGas).toNumber(),
                    data: safeTransaction.data,
                    gasPrice: BigNumber.from(safeTransaction.gasPrice).toNumber(),
                    gasToken: safeTransaction.gasToken,
                    nonce: BigNumber.from(safeTransaction.nonce).toNumber(),
                    operation: BigNumber.from(safeTransaction.operation).toNumber(),
                    refundReceiver: safeTransaction.refundReceiver,
                    safeTxGas: BigNumber.from(safeTransaction.safeTxGas).toNumber(),
                    to: safeTransaction.to,
                    value: BigNumber.from(safeTransaction.value).toString(),
                })
                ethSafeTx.addSignature(new EthSignSignature(signature.signer, signature.data));
            
                await safeService.proposeTransaction({
                safeAddress,
                safeTransaction: ethSafeTx,
                senderAddress: await signer.getAddress(),
                safeTxHash: safeTxHash,
                })

                alert("Transaction proposed! Please review and execute on the Transactions tab in the Gnosis UI. Please note that it may take minutes for the Gnosis UI to reflect the new transaction.")
            } catch (e) {
                console.error(e);
                alert(`Failed to propose transaction: ${e}`);
            }
        }
        body = (
            <>
                <Card>
                    <Text size="lg">1. Review Transaction Details</Text>
                    <Accordion>
                    <AccordionSummary>
                        <IconText
                            iconSize="sm"
                            textSize="xl"
                            iconType="arrowRight"
                            text="To"
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Card>
                        <EthHashInfo hash={safeTransaction.to} showAvatar/>
                        <Text size="sm">
                            This is the address 
                            of <a href="https://github.com/gnosis/safe-contracts/blob/main/contracts/libraries/MultiSend.sol" target="_blank" rel="noreferrer">
                                the MultiSend library
                            </a>
                        </Text>
                        </Card>
                    </AccordionDetails>
                    </Accordion>
                    <Accordion>
                    <AccordionSummary>
                        <IconText
                            iconSize="sm"
                            textSize="xl"
                            iconType="arrowRight"
                            text="Data"
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Text className="OverflowText" size="sm">
                            {safeTransaction.data}
                        </Text>
                    </AccordionDetails>
                    </Accordion>
                    <Accordion>
                    <AccordionSummary>
                        <IconText
                        iconSize="sm"
                        textSize="xl"
                        iconType="arrowRight"
                        text="Operation Type"
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Text size="lg">DELEGATE_CALL</Text>
                    </AccordionDetails>
                    </Accordion>
                    <Accordion>
                    <AccordionSummary>
                        <IconText
                            iconSize="sm"
                            textSize="xl"
                            iconType="arrowRight"
                            text="Nonce"
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Text size="lg">{safeTransaction.nonce}</Text>
                    </AccordionDetails>
                    </Accordion>
                </Card>
                <Card>
                    <Title size="xs">2. Submit</Title>
                    <Text size="lg">Signing transaction as <EthHashInfo hash={signerAddress} showAvatar /></Text>
                    <Text strong size="md">
                        Note that this address must be either an owner of this safe or a delegate of an owner.
                        Signing as a delegate is preferred, as signatures from delegates are never counted toward a safe's signature threshold.
                        To register a delegate, <a target="_blank" href="https://gnosis-delegator.badger.guru/" rel="noreferrer">try this utility.</a>
                    </Text>
                    <Divider/>
                    <Button size="lg" onClick={proposeTransaction}>Prompt Signature</Button>
                </Card>
            </>
        )
    }

    return (
        <Card className="card">
            <Title size="xs">Review and Submit</Title>
            {body}            
        </Card>
    )
}

export default Step6
