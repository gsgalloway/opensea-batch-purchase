import React, { useCallback, useEffect, useState } from 'react'
// import styled from 'styled-components'
import { Card, Divider, Dot, Loader, Title, Text, Button, Accordion, AccordionSummary, IconText, AccordionDetails } from '@gnosis.pm/safe-react-components'
import { BigNumber, Signer } from 'ethers';
import { TokenDescription } from './types';
import { Provider, Network, getNetwork, Web3Provider } from '@ethersproject/providers';
import { useQuery } from 'react-query';
import { capitalizeFirstLetter } from './utils';
import Web3Modal from 'web3modal'
import WalletLink from 'walletlink'
import NFTForm from './NFTForm';
import ManageListModal from './ManageListModal';
import openseaDetailsImage from './opensea_details.png';
import TokenList from './TokenList';
import { Configuration, DefaultApi } from './api';
import './App.css';

// const Container = styled.div`
//   padding: 1rem;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `

const web3Modal = new Web3Modal({
  cacheProvider: false,
  providerOptions: {
    'custom-walletlink': {
      display: {
        logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
        name: 'Coinbase',
        description: 'Connect to Coinbase Wallet (not Coinbase App)',
      },
      options: {
        appName: 'Coinbase', // Your app name
        networkUrl: `https://mainnet.infura.io/v3/`,
        chainId: 1,
      },
      package: WalletLink,
      connector: async (_, options) => {
        const { appName, networkUrl, chainId } = options
        const walletLink = new WalletLink({
          appName,
        })
        const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
        await provider.enable()
        return provider
      },
    }
  }
})

type NetworkConnectionInfo = {
  provider: any,
  web3Provider: Web3Provider,
  signer: Signer,
  address: string,
  network: Network
}

const SafeApp = (): React.ReactElement => {
  const [isManageListModalOpen, setIsManageListModalOpen] = useState(false);
  const [tokens, setTokens] = useState<TokenDescription[]>([])
  const [inputTokenID, setInputTokenID] = useState('');
  const [inputTokenContractAddress, setInputTokenContractAddress] = useState('');
  const [isTransactionBuilderLoading, setIsTransactionBuilderLoading] = useState(false);
  const [networkConnectionInfo, setNetworkConnectionInfo] = useState<NetworkConnectionInfo | undefined>(undefined);

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new Web3Provider(provider)

    const accounts = await web3Provider.listAccounts();
    if (accounts.length === 0) {
      console.error("Empty list of connected accounts")
      return;
    }
    const signer = web3Provider.getSigner(accounts[0])
    const address = accounts[0];
    const network = await web3Provider.getNetwork()
    setNetworkConnectionInfo({provider, signer, address, network, web3Provider})
  }, [])

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (networkConnectionInfo?.provider?.disconnect && typeof networkConnectionInfo?.provider.disconnect === 'function') {
        await networkConnectionInfo.provider.disconnect()
      }
      setNetworkConnectionInfo(undefined)
      setIsManageListModalOpen(false);
    },
    [networkConnectionInfo]
  )

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  useEffect(() => {
    if (networkConnectionInfo?.provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          const signer = networkConnectionInfo.web3Provider.getSigner(accounts[0])
          setNetworkConnectionInfo({
            ...networkConnectionInfo,
            address: accounts[0],
            signer: signer,
          });
        }
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        disconnect()
      }

      networkConnectionInfo.provider.on('accountsChanged', handleAccountsChanged)
      networkConnectionInfo.provider.on('chainChanged', handleChainChanged)
      networkConnectionInfo.provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (networkConnectionInfo.provider.removeListener) {
          networkConnectionInfo.provider.removeListener('accountsChanged', handleAccountsChanged)
          networkConnectionInfo.provider.removeListener('chainChanged', handleChainChanged)
          networkConnectionInfo.provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [networkConnectionInfo, disconnect])

  const api = new DefaultApi(new Configuration({
    basePath: "http://localhost:8080",
  }));

  const submitTx = useCallback(async () => {
    try {
      setIsTransactionBuilderLoading(true);
      // const provider = getProvider();
      // await provider.send("eth_requestAccounts", []);
      // const network = await provider.getNetwork();
      // const signer = provider.getSigner();

      // const {openseaApiKey} = getOpenseaParams(network);
      // const openseaBulkPurchaser = new OpenseaBulkPurchaser(provider, {openseaApiKey, network: network.name});
      // const purchaseTxs: SinglePurchaseTx[] = [];
      // for (const token of tokens) {
      //   const purchaseTx = await openseaBulkPurchaser.createSingleTokenPurchase(token.id, token.contractAddress, safe.safeAddress);
      //   purchaseTxs.push(purchaseTx);
      // }

      // const batchTx = await openseaBulkPurchaser.createBatchTxFromPurchases(purchaseTxs);
      // const safeTx = await openseaBulkPurchaser.safeTransactionFromMetaTransaction(batchTx, safe.safeAddress);
      // const safeContract = new Contract(safe.safeAddress, gnosisSafeABI, provider);

      // const safeTxHash = calculateSafeTransactionHash(safeContract, safeTx, network.chainId);

      // const signature = await signHash(signer, safeTxHash);

      // let safeServiceURL = 'https://safe-transaction.gnosis.io';
      // if (network.name === 'rinkeby') {
      //   safeServiceURL = 'https://safe-transaction.rinkeby.gnosis.io';
      // }
      // const safeService = new SafeServiceClient(safeServiceURL);

      // const ethSafeTx = new EthSafeTransaction({
      //   baseGas: BigNumber.from(safeTx.baseGas).toNumber(),
      //   data: safeTx.data,
      //   gasPrice: BigNumber.from(safeTx.gasPrice).toNumber(),
      //   gasToken: safeTx.gasToken,
      //   nonce: BigNumber.from(safeTx.nonce).toNumber(),
      //   operation: safeTx.operation,
      //   refundReceiver: safeTx.refundReceiver,
      //   safeTxGas: BigNumber.from(safeTx.safeTxGas).toNumber(),
      //   to: safeTx.to,
      //   value: BigNumber.from(safeTx.value).toString(),
      // })
      // ethSafeTx.addSignature(new EthSignSignature(signature.signer, signature.data));

      // await safeService.proposeTransaction({
      //   safeAddress: safe.safeAddress,
      //   safeTransaction: ethSafeTx,
      //   senderAddress: await signer.getAddress(),
      //   safeTxHash: safeTxHash,
      // })

      // alert("Transaction proposed! Please review and execute on the Transactions tab in the Gnosis UI.")
    }
    catch (e) {
      console.error(e);
      alert(e);
    }
    finally {
      setIsTransactionBuilderLoading(false);
    }
  }, [tokens])

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

  const supportedNetworks = [getNetwork('homestead'), getNetwork('rinkeby')]

  return (
    <div className='App'>
      <Title size="md">Create a Batch OpenSea Purchase</Title>

      <Card className="card">
          <Dot color="primary">
              <Text size="xl" color="white">
                  1
              </Text>
          </Dot>
          <Title size="xs">Introduction</Title>
          <Text size="xl">This app allows for creation of a single transaction to purchase multiple OpenSea assets in batch. The purchase is constructed with all-or-nothing atomicity.</Text>
          <Text size="xl"> TODO: describe components </Text>
          <Divider/>
          <Text size="xl">Currently supports: {
              supportedNetworks.map((network) =>
                  (<span className="networkName">{capitalizeFirstLetter(network.name)} </span>))
          }
          </Text>
      </Card>

      <Card className="card">
          <Dot color="primary">
              <Text size="xl" color="white">
                  2
              </Text>
          </Dot>
          <Title size="xs">Connect Web3 Provider</Title>
          {networkConnectionInfo ? (
            <div>
              <Text size="lg">Connected to: <span className="networkName">{capitalizeFirstLetter(networkConnectionInfo.network.name)}</span></Text>
              <Text size="lg">Address: {networkConnectionInfo.address}</Text>
              <Divider/>
              <Button size="md" onClick={disconnect}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button size="md" onClick={connect}>
              Connect
            </Button>
          )}
      </Card>
      
      {networkConnectionInfo ? (
        <Card className="card">
          <Dot color="primary">
            <Text size="xl" color="white">
                3
            </Text>
          </Dot>
          <Title size="xs"> Select Assets</Title>
          <Text size="xl">Enter a list of tokens to purchase. For each you must provide the token's Contract Address and ID</Text>
          <Accordion>
            <AccordionSummary>
              <IconText
                iconSize="sm"
                textSize="xl"
                iconType="info"
                text="How to locate token's Contract Address and ID"
              />
            </AccordionSummary>
            <AccordionDetails>
              <Text size="lg">The contract address and token ID can be found on the asset's details page within the OpenSea app, by locating the "Details" dropdown midway through the page.</Text>
              <img src={openseaDetailsImage} alt="openseaExample" style={{width: "50%"}}></img>
            </AccordionDetails>
          </Accordion>
          <Button size="md" color="primary" onClick={() => setIsManageListModalOpen(!isManageListModalOpen)}>
            Edit List
          </Button>
          {isManageListModalOpen && (
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
              onClose={() => setIsManageListModalOpen(false)}
              onItemToggle={() => undefined}
              onItemDeleted={onItemDeleted}
            />
          )}
        </Card>
      ): <div/>}

      {networkConnectionInfo && tokens.length > 0 ? (
        <Card className="card">
          <TokenList tokens={tokens} network={networkConnectionInfo.network} api={api}/>
        </Card>
      ) : <div/>}
    
    </div>
  )
}

export default SafeApp
