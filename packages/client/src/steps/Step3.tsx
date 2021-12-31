import { Card, Divider, Text, Accordion, AccordionSummary, IconText, AccordionDetails, Button } from "@gnosis.pm/safe-react-components"
import TokenList from "../TokenList";
import openseaDetailsImage from './opensea_details.png';
import { TokenDescription } from "../types";
import { UseQueryResult } from "react-query";
import { OpenSeaAsset } from "opensea-js/lib/types";
import ManageListModal from "../ManageListModal";
import NFTForm from "../NFTForm";
import './Step3.css';

type Props = {
    isManageListModalOpen: boolean,
    setIsManageListModalOpen: (val: boolean) => void,
    tokens: TokenDescription[],
    tokenListings: Array<UseQueryResult<OpenSeaAsset>>,
    inputTokenID: string,
    setInputTokenID: (tokenId: string) => void,
    inputTokenContractAddress: string,
    setInputTokenContractAddress: (addr: string) => void,
    onSubmitForm: () => void,
    onItemDeleted?: (itemId: number | string) => void;
    toNextTab: () => void;
    tokenListError: Error | null;
}

const Step3 = ({
    isManageListModalOpen,
    setIsManageListModalOpen,
    tokens,
    tokenListings,
    inputTokenID,
    setInputTokenID,
    inputTokenContractAddress,
    setInputTokenContractAddress,
    onSubmitForm,
    onItemDeleted,
    toNextTab,
    tokenListError,
}: Props): React.ReactElement => {
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

    const buttonDisabled = !!tokenListError || tokenListings.map(({isSuccess}) => !isSuccess).reduce((prev, cur) => prev && cur)

    return (
        <Card className="card">
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
          {tokens.length > 0 ? (
            <Card className="card">
              <TokenList tokenDescriptions={tokens} tokenListings={tokenListings}/>
            </Card>
          ) : <div/>}
          <Divider/>
          <Button className="CrowdedButton" size="md" color="primary" onClick={() => setIsManageListModalOpen(!isManageListModalOpen)}>
            Edit Token List
          </Button>
          {tokens.length > 0 ? <Button className="CrowdedButton" size="md" disabled={buttonDisabled} onClick={toNextTab}>
                {tokenListError == null ? 'Continue' : tokenListError.message }
          </Button> : <div/>}
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
              onSubmitForm={onSubmitForm}
              onClose={() => setIsManageListModalOpen(false)}
              onItemToggle={() => undefined}
              onItemDeleted={onItemDeleted}
            />
          )}
        </Card>
    )
}

export default Step3
