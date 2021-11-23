import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, Card, Divider, Loader, Title } from '@gnosis.pm/safe-react-components'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import OpenseaBulkPurchaser, { SinglePurchaseTx } from '@gsgalloway/opensea-bulk-purchaser';
import { BigNumber, providers, Contract } from 'ethers';
import NFTForm from './NFTForm';
import ManageListModal from './ManageListModal';
import TokenList from './TokenList';
import { TokenDescription } from './types';
import { Network as OpenseaNetwork } from 'opensea-js';
import { signHash, calculateSafeTransactionHash } from "@gnosis.pm/safe-contracts";
import { gnosisSafeABI } from './gnosis-abi';
import SafeServiceClient from '@gnosis.pm/safe-service-client'
import EthSafeTransaction from '@gnosis.pm/safe-core-sdk/dist/src/utils/transactions/SafeTransaction';
import { EthSignSignature } from '@gnosis.pm/safe-core-sdk';
import { Provider, Network, Web3Provider } from '@ethersproject/providers';
import { useQuery } from 'react-query';

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const loadNetwork = async (provider: Provider): Promise<Network> => {
  return await provider.getNetwork();
}

const getProvider = (): Web3Provider => {
  const provider = new providers.Web3Provider((window as any).ethereum)
  if (!provider) {
    throw new Error("no ethereum provider registered");
  }
  return provider;
}

const getOpenseaParams = (network: Network): {openseaApiKey: string, openseaNetworkName: OpenseaNetwork} => {
  const networkName = network.name;

  let openseaApiKey: string;
  if (networkName === "mainnet" || networkName === "homestead") {
    if (!process.env.REACT_APP_OPENSEA_API_KEY) {
      throw new Error("must define REACT_APP_OPENSEA_API_KEY");
    }
    openseaApiKey = process.env.REACT_APP_OPENSEA_API_KEY
  } else {
    if (!process.env.REACT_APP_RINKEBY_OPENSEA_API_KEY) {
      throw new Error("must define REACT_APP_RINKEBY_OPENSEA_API_KEY");
    }
    openseaApiKey = process.env.REACT_APP_RINKEBY_OPENSEA_API_KEY
  }

  let openseaNetworkName: OpenseaNetwork;
  switch (networkName) {
    case "mainnet":
    case "homestead":
      openseaNetworkName = OpenseaNetwork.Main;
      break;
    case "rinkeby":
      openseaNetworkName = OpenseaNetwork.Rinkeby;
      break;
    default:
      throw new Error(
        `network ${networkName} is not supported by opensea-js`
      );
  }
  return {
    openseaApiKey,
    openseaNetworkName,
  }
}

const SafeApp = (): React.ReactElement => {
  const { safe } = useSafeAppsSDK();
  const [isOpen, setIsOpen] = useState(false);
  const [tokens, setTokens] = useState<TokenDescription[]>([])
  const [inputTokenID, setInputTokenID] = useState('');
  const [inputTokenContractAddress, setInputTokenContractAddress] = useState('');
  const [isTransactionBuilderLoading, setIsTransactionBuilderLoading] = useState(false);

  const submitTx = useCallback(async () => {
    try {
      setIsTransactionBuilderLoading(true);
      await (window as any).ethereum.enable();
      const provider = getProvider();
      const network = await provider.getNetwork();
      const signer = provider.getSigner();

      const {openseaApiKey, openseaNetworkName} = getOpenseaParams(network);
      const openseaBulkPurchaser = new OpenseaBulkPurchaser(provider, {openseaApiKey, network: openseaNetworkName});
      const purchaseTxs: SinglePurchaseTx[] = [];
      for (const token of tokens) {
        const purchaseTx = await openseaBulkPurchaser.createSingleTokenPurchase(token.id, token.contractAddress, safe.safeAddress);
        purchaseTxs.push(purchaseTx);
      }

      const batchTx = await openseaBulkPurchaser.createBatchTransactionFromPurchases(purchaseTxs, safe.safeAddress);
      const safeContract = new Contract(safe.safeAddress, gnosisSafeABI, provider);

      const safeTxHash = calculateSafeTransactionHash(safeContract, batchTx, network.chainId);

      const signature = await signHash(signer, safeTxHash);

      let safeServiceURL = 'https://safe-transaction.gnosis.io';
      if (network.name === 'rinkeby') {
        safeServiceURL = 'https://safe-transaction.rinkeby.gnosis.io';
      }
      const safeService = new SafeServiceClient(safeServiceURL);

      const ethSafeTx = new EthSafeTransaction({
        baseGas: BigNumber.from(batchTx.baseGas).toNumber(),
        data: batchTx.data,
        gasPrice: BigNumber.from(batchTx.gasPrice).toNumber(),
        gasToken: batchTx.gasToken,
        nonce: BigNumber.from(batchTx.nonce).toNumber(),
        operation: batchTx.operation,
        refundReceiver: batchTx.refundReceiver,
        safeTxGas: BigNumber.from(batchTx.safeTxGas).toNumber(),
        to: batchTx.to,
        value: BigNumber.from(batchTx.value).toString(),
      })
      ethSafeTx.addSignature(new EthSignSignature(signature.signer, signature.data));

      await safeService.proposeTransaction({
        safeAddress: safe.safeAddress,
        safeTransaction: ethSafeTx,
        senderAddress: await signer.getAddress(),
        safeTxHash: safeTxHash,
      })

      alert("Transaction proposed! Please review and execute on the Transactions tab in the Gnosis UI.")
    }
    catch (e) {
      console.error(e);
      alert(e);
    }
    finally {
      setIsTransactionBuilderLoading(false);
    }
  }, [tokens, safe])

  const provider = getProvider();

  const { isLoading: isNetworkLoading, data: network, error } = useQuery(['loadNetwork'], () => loadNetwork(provider))
  if (isNetworkLoading) {
      return <Loader size="lg" />
  }
  if (error) {
      alert(error);
      return <></>;
  }
  if (network === undefined) {
      throw new Error("network is undefined")
  }

  const {openseaApiKey, openseaNetworkName} = getOpenseaParams(network);

  const onNFTFormSubmitted = () => {
    setTokens([...tokens, {id: BigNumber.from(inputTokenID), contractAddress: inputTokenContractAddress}])
  }

  const onItemDeleted = (itemId: number | string): void => {
    if (typeof(itemId) === 'string') {
      throw new Error(`itemID ${itemId} should be number`)
    }
    const newTokens = [...tokens];
    newTokens.splice(itemId, 1)
    setTokens(newTokens);
  }


  const getListItems = () => {
    return Array.from(tokens.entries()).map(([index, token]) => {
      return {
            id: index,
            iconUrl: 'someUrl',
            name: `${token.id}`,
            description: `Token at ${token.contractAddress}`,
            checked: true,
            isDeletable: true,
      };
    })
  }

  return (
    <Container>
      {isTransactionBuilderLoading && (
        <Loader size={"lg"} />
      )}

      <Title size="md">New Batch OpenSea Purchase</Title>

      {tokens.length > 0 && (
        <Card>
          <TokenList tokens={tokens} network={openseaNetworkName} apiKey={openseaApiKey}/>
        </Card>
      )}

      <br />

      <Button size="lg" color="primary" onClick={() => setIsOpen(!isOpen)}>
        1. Select NFTs
      </Button>
      {isOpen && (
        <ManageListModal
          title={"Add Token"}
          defaultIconUrl={"https://opensea.io/static/images/logos/opensea.svg"}
          itemList={getListItems()}
          showDeleteButton
          addButtonLabel="Add token to batch"
          formBody={<NFTForm
            tokenID={inputTokenID}
            tokenContractAddress={inputTokenContractAddress}
            onTokenIDChanged={setInputTokenID}
            onTokenContractAddressChanged={setInputTokenContractAddress}
          />}
          onSubmitForm={onNFTFormSubmitted}
          onClose={() => setIsOpen(false)}
          onItemToggle={() => undefined}
          onItemDeleted={onItemDeleted}
        />
      )}

      <Divider />

      <Button size="lg" color="primary" onClick={submitTx}>
        2. Construct Batch Transaction
      </Button>

    </Container>
  )
}

export default SafeApp
