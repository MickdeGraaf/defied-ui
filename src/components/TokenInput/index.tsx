import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import { Button, Input, useColorModeValue } from "@chakra-ui/react";
import TokenIcon from "../TokenIcon";
import { utils } from "ethers";
import TokenSelectModal from "../TokenSelectModal";
import { useState } from "react";
import TokenBalance from "../TokenBalance";
import { useEthers, useTokenBalance } from "@usedapp/core";


interface SetToken {
    (token: any): void
}

interface TokenInputProps {
    setToken: SetToken
    tokens: any[]
    selectedToken: any
    output?: Boolean
    onUpdate?: React.ChangeEventHandler<HTMLInputElement>
    value: string;
}

const TokenInput: React.FunctionComponent<TokenInputProps> = ({ setToken, tokens, selectedToken, output, onUpdate, value }) => {

    const [open, setOpen] = useState(false);
    const { account } = useEthers();
    const tokenBalance = useTokenBalance(selectedToken.address, account)
    

    const closeModal = () => {
        setOpen(false);
    }

    const openModal = () => {
        setOpen(true);
    }

    const handleBalanceClick = () => {
        if(output) {
            return;
        }


    };

    return(
        <>
            <Flex flex="1" mx="6" my="2" h="80px" bg={output ? "gray.50": "white"} px="6" align="center">
                
                <Button onClick={openModal} leftIcon={<TokenIcon size="25px" address={selectedToken.address} />} rightIcon={<ChevronDownIcon />} variant="outline">{selectedToken.symbol}</Button>
                <Input type="number" value={value} disabled={!!output} variant='unstyled' placeholder='0.0' textAlign="right" size="lg" onChange={onUpdate && onUpdate} />
                
            </Flex>
            <Flex mx="12" alignContent={"right"}>
                    <Box flex="1">
                        {/*  Spacer div, gross */}
                    </Box>
                balance:&nbsp;<TokenBalance address={selectedToken.address} decimals={selectedToken.decimals}/></Flex>
            <TokenSelectModal tokens={tokens} setToken={setToken} open={open} closeModal={closeModal} />
        </>
    )
}

export default TokenInput;