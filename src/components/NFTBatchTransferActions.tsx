import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useCall, useContractFunction, useEthers } from "@usedapp/core";
import { constants, Contract, utils } from "ethers";
import { useState } from "react";
import IERC721ABI from "../abis/IERC721.json";
import BatchTransferABI from "../abis/BatchTransfer.json";
import NFTBatchTransferConfig from "../config/NFTBatchTransfer.json";
import { split } from "@chakra-ui/utils";

const NFTBatchTransferActions = () => {

    const [addressError, setAddressError] = useState<string>("");
    const [addressValue, setAddressValue] = useState<string>("");
    const [addresses, setAddresses] = useState<string[]>([]);
    const [tokenIds, setTokenIds] = useState<number[]>([]);

    const { account, chainId } = useEthers();

    // @ts-ignore
    const batchTransferContractAddress = NFTBatchTransferConfig[chainId];

    const ERC721ContractAddress = (addressError == "" && utils.isAddress(addressValue)) ? addressValue : undefined;
    const ERC721Contract = new Contract(ERC721ContractAddress || constants.AddressZero, IERC721ABI);

    const approveFunction = useContractFunction(ERC721Contract, "setApprovalForAll");

    const isApproved = useCall(ERC721ContractAddress && {
        contract: ERC721Contract,
        method: "isApprovedForAll",
        args: [
            account,
            batchTransferContractAddress || constants.AddressZero
        ]
    })?.value?.[0];

    const batchTransferContract = new Contract(batchTransferContractAddress, BatchTransferABI);
    const sendFunction = useContractFunction(batchTransferContract, "batchTransfer");

    const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setAddressValue(e.currentTarget.value);
        if(e.currentTarget.value == "" || e.currentTarget.value == undefined) {
            console.log("setting address error undefined")
            setAddressError("");
            return;
        }
        if(!utils.isAddress(e.target.value)) {
            setAddressError("invalid address");
            return;
        }
    }

    const handleDataChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const data = e.target.value;

        const rows = data.split("\n");

        const receivers: string[] = [];
        const tokenIds: number[] = [];


        rows.map((row) => {
            const splitted = row.split(",");

            if(!splitted[0] || !splitted[1]) {
                return;
            }

            receivers.push(splitted[0].trim());
            tokenIds.push(parseInt(splitted[1].trim()))
        })
        

        setAddresses(receivers);
        setTokenIds(tokenIds);
    }

    const handleApproveClick = () => {
        approveFunction.send(batchTransferContract.address, true);
    }

    const handleSendClick = () => {
        sendFunction.send(ERC721Contract.address, addresses, tokenIds);
    }

    return (
        <Box>
            <FormControl isInvalid={addressError !== ""} mt={4} isRequired>
                <FormLabel htmlFor='address'>NFT contract address</FormLabel>
                <FormErrorMessage>{addressError}aaa</FormErrorMessage>
                <Input  onChange={handleAddressChange} value={addressValue} id='address' placeholder='NFT contract address' />
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel htmlFor='data'>TokenIds and Receivers</FormLabel>
                <FormHelperText>One entry per line see example for format</FormHelperText>
                {/* <FormErrorMessage>{addressError}aaa</FormErrorMessage> */}
                <Textarea onChange={handleDataChange} placeholder="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045, 420" id='data'>
                </Textarea>
            </FormControl>

            {!(isApproved) ?
                <Button onClick={handleApproveClick}>Approve</Button>
                :
                <Button onClick={handleSendClick}>Batch Transfer</Button>
            }
            <br />
            <>Receivers <br /></>
            {JSON.stringify(addresses, null, 2)}
            <br />
            <>TokenIds <br /></>
            {JSON.stringify(tokenIds, null, 2)}

        </Box>
        
    );
}

export default NFTBatchTransferActions;