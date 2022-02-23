import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { Button, Input, useColorModeValue } from "@chakra-ui/react";
import TokenIcon from "../TokenIcon";
import { utils } from "ethers";
import TokenSelectModal from "../TokenSelectModal";
import { useState } from "react";


interface SetToken {
    (token: any): void
}

interface TokenInputProps {
    setToken: SetToken
    tokens: any[]
    selectedToken: any
}

const TokenInput: React.FunctionComponent<TokenInputProps> = ({ setToken, tokens, selectedToken }) => {

    const [open, setOpen] = useState(false);
    const closeModal = () => {
        setOpen(false);
    }

    const openModal = () => {
        setOpen(true);
    }

    return(
        <>
        <Flex flex="1" mx="6" my="2" h="80px" bg={useColorModeValue("white", "gray.900")} px="6" align="center">
            <Button onClick={openModal} leftIcon={<TokenIcon size="25px" address={selectedToken.address} />} rightIcon={<ChevronDownIcon />} variant="outline">{selectedToken.symbol}</Button>
            <Input type="number" variant='unstyled' placeholder='0.0' textAlign="right" size="lg" />
        </Flex>
            <TokenSelectModal tokens={tokens} setToken={setToken} open={open} closeModal={closeModal} />
        </>
    )
}

export default TokenInput;