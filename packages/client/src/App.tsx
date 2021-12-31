import React, { useCallback, useEffect, useState } from 'react'
import { Tab, Title } from '@gnosis.pm/safe-react-components'
import { BigNumber } from 'ethers';
import { TokenDescription } from './types';
import { Network, getNetwork, Web3Provider } from '@ethersproject/providers';
import { useQueries, useQuery } from 'react-query';
import { isForSale, NetworkConnectionInfo, unreachable } from './utils';
import Web3Modal from 'web3modal'
import WalletLink from 'walletlink'
import { Configuration, DefaultApi, InlineObjectNetworkEnum, SafeTransaction } from './api';
import { OpenSeaAsset } from 'opensea-js/lib/types';
import { Item } from '@gnosis.pm/safe-react-components/dist/navigation/Tab';
import Step1 from './steps/Step1'
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step6 from './steps/Step6';
import './App.css';


const web3Modal = new Web3Modal({
  cacheProvider: true,
})

const loadTokenAsset = async (token: TokenDescription, api: DefaultApi, network: Network): Promise<OpenSeaAsset> => {
  const resp = await api.getAsset(token.contractAddress, token.id.toString(), network.name as any, {
    validateStatus: (status) => status === 200,
  })
  const sellOrders = (resp.data as OpenSeaAsset).sellOrders
  if (sellOrders) {
      sellOrders.sort((order1, order2) => {
          const [bn1, bn2] = [order1, order2].map(BigNumber.from)
          if (bn1.lt(bn2)) return -1
          if (bn1.gt(bn2)) return 1
          return 0;
      })
  }
  return resp.data as OpenSeaAsset
}

const api = new DefaultApi(new Configuration({
  basePath: "http://localhost:8080",
}));

const SafeApp = (): React.ReactElement => {
  const [selectedTabIndex, setSelectedTabIndex] = useState('1');
  const [isManageListModalOpen, setIsManageListModalOpen] = useState(false);
  const [tokens, setTokens] = useState<TokenDescription[]>([])
  const [inputTokenID, setInputTokenID] = useState('');
  const [inputTokenContractAddress, setInputTokenContractAddress] = useState('');
  const [networkConnectionInfo, setNetworkConnectionInfo] = useState<NetworkConnectionInfo | undefined>(undefined);
  const [safeAddress, setSafeAddress] = useState(networkConnectionInfo?.address);

  const tokenListings = useQueries(
    networkConnectionInfo ? tokens.map(token => {
        return {
            queryKey: ['loadTokenAsset', token.contractAddress, token.id],
            queryFn: () => loadTokenAsset(token, api, networkConnectionInfo.network),
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        }
    }) : []
  )

  const submitTransactionQueryFn = async (): Promise<SafeTransaction> => {
    if (!networkConnectionInfo) {
      throw new Error("No connection to Web3 provider")
    }
    const networkName = networkConnectionInfo.network.name as InlineObjectNetworkEnum
    switch (networkName) {
      case InlineObjectNetworkEnum.Homestead:
      case InlineObjectNetworkEnum.Rinkeby:
        break
      default:
        throw unreachable(networkName, `Unsupported network "${networkName}"`)
    }
    const serializedTokens = tokens.map(token => {
      return {
        ...token,
        id: token.id.toString()
      }
    })
    if (safeAddress === undefined) {
      throw new Error("No safe address set");
    }
    setSelectedTabIndex('6')
    const response = await api.createBatchTransaction({
      network: networkName,
      gnosisSafeAddress: safeAddress,
      recipient: safeAddress,
      tokens: serializedTokens,
    }, {
      validateStatus: (status) => status === 200,  
    })
    return response.data;
  }

  const { 
    data: safeTransaction,
    isLoading: isSafeTransactionLoading,
    isError: isSafeTransactionError,
    isSuccess: isSafeTransactionSuccess,
    error: safeTransactionError,
    refetch: submitTransaction,
  } = useQuery(["submitTransaction", tokens], {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: false, // turned off by default, manual refetch happens when Submit button is clicked
    queryFn: submitTransactionQueryFn,
  });

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
      setSelectedTabIndex('2');
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

  const supportedNetworks = [getNetwork('homestead'), getNetwork('rinkeby')]

  const validateTokenList = (): Error | null => {
    if (tokenListings.length === 0) {
      return new Error("Must select tokens")
    }
    for (const {data: asset, isLoading, isError, error} of tokenListings) {
      if (isLoading) return new Error("Loading token listings...")
      if (isError) {
        console.error(error)
        return new Error("Failed to load tokens")
      }
      if (asset === undefined) return new Error("Invalid data received for token listing")
      if (!isForSale(asset)) return new Error("Remove any assets not for sale")
    }
    return null
  }

  const tokenListError = validateTokenList();

  const shouldShowStepFour =  networkConnectionInfo !== undefined && !tokenListError
  const shouldShowStepFive = shouldShowStepFour && safeAddress;
  const shouldShowStepSix = shouldShowStepFive && (isSafeTransactionLoading || isSafeTransactionError || isSafeTransactionSuccess);

  const getTabItems = (): Item[] => {
    const items: Item[] = [{
      id: '1',
      label: '1. Introduction',
    }, {
      id: '2',
      label: '2. Connect Provider'
    }, {
      id: '3',
      label: '3. Select Assets',
      disabled: !networkConnectionInfo,
    }, {
      id: '4',
      label: '4. Gnosis Safe Address',
      disabled: !shouldShowStepFour,
    }, {
      id: '5',
      label: '5. Build Transaction Data',
      disabled: !shouldShowStepFive,
    }, {
      id: '6',
      label: '6. Review and Submit',
      disabled: !shouldShowStepSix,
    }]
    return items;
  }

  const tabContent = (): JSX.Element => {
    switch (selectedTabIndex) {
      default:
      case '1':
        return <Step1 supportedNetworks={supportedNetworks} toNextTab={() => setSelectedTabIndex('2')}/>
      case '2':
        return <Step2 
          connect={connect} 
          disconnect={disconnect} 
          networkConnectionInfo={networkConnectionInfo}
          toNextTab={() => setSelectedTabIndex('3')}
          supportedNetworks={supportedNetworks}
        />
      case '3':
        return <Step3
          isManageListModalOpen={isManageListModalOpen}
          setIsManageListModalOpen={setIsManageListModalOpen}
          tokens={tokens}
          tokenListings={tokenListings}
          inputTokenID={inputTokenID}
          setInputTokenID={setInputTokenID}
          inputTokenContractAddress={inputTokenContractAddress}
          setInputTokenContractAddress={setInputTokenContractAddress}
          onSubmitForm={onNFTFormSubmitted}
          onItemDeleted={onItemDeleted}
          toNextTab={() => setSelectedTabIndex('4')}
          tokenListError={tokenListError}
        />
      case '4':
        return <Step4 address={safeAddress!} onChangeAddress={setSafeAddress} toNextTab={() => setSelectedTabIndex('5')}/>
      case '5':
        return <Step5 onSubmitTransaction={() => submitTransaction()}/>
      case '6':
        return <Step6 
          safeTransaction={safeTransaction} 
          isLoading={isSafeTransactionLoading} 
          isError={isSafeTransactionError} 
          isSuccess={isSafeTransactionSuccess} 
          error={safeTransactionError as Error | undefined} 
          signer={networkConnectionInfo!.signer}
          signerAddress={networkConnectionInfo!.address}
          network={networkConnectionInfo!.network}
          provider={networkConnectionInfo!.provider}
          safeAddress={safeAddress!}
        />
    }
  }

  return (
    <div className='App'>
      <Title size="md">Create Batch OpenSea Purchase</Title>

      <Tab 
        items={getTabItems()}
        onChange={setSelectedTabIndex}
        selectedTab={selectedTabIndex}
      />
      {tabContent()}
    </div>
  )
}

export default SafeApp
