import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout";
import { Button, Circle } from "@chakra-ui/react";
import { ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons'
import PageHeader from "../components/PageHeader";
import TokenInput from "../components/TokenInput";
import { useEffect, useState } from "react";
import { utils } from "ethers";
import TokenIcon from "../components/TokenIcon";
import TokenSelectModal from "../components/TokenSelectModal";
import lendingMigratorAssets from "../config/lendingMigratorAssets";


const fetchSwapOptionsFromUnderlying = (token: string) => {
    const result: any[] = [];
    // @ts-ignore
    const underlying = lendingMigratorAssets[token];

    result.push({
        address: token,
        decimals: underlying.decimals,
        name: underlying.name,
        symbol: underlying.symbol,
        protocol: underlying.protocol
    });

    console.log(underlying);

    Object.keys(underlying.lendingTokens).map((key) => {
        // @ts-ignore
        const token = underlying.lendingTokens[key];

        result.push({
            address: key,
            decimals: token.decimals,
            name: token.name,
            symbol: token.symbol,
            protocol: token.protocol
        });
    });

    return result;
};


function generateRoute(inputToken: any, outputToken: any) {
    
}


const LendingSwap = () => {
    
    const [underlyingModalOpen, setUnderlyingModalOpen] = useState(false);
    
    const underlyingTokens = Object.keys(lendingMigratorAssets).map((key) => {
        // @ts-ignore
        const underlying = lendingMigratorAssets[key];

        return {
            address: key,
            decimals: underlying.decimals,
            name: underlying.name,
            symbol: underlying.symbol
        }
    });

    const [underlying, setUnderlying] = useState(underlyingTokens[0]);
    const [swapOptions, setSwapOptions] = useState(fetchSwapOptionsFromUnderlying(underlyingTokens[0].address));

    const [inputToken, setInputToken] = useState(swapOptions[0]);
    const [outputToken, setOutputToken] = useState(swapOptions[1]);

    const handleSetInputToken = (token: any) => {
        setInputToken(token);
    }

    const handleSetOutputToken = (token: any) => {
        setOutputToken(token);
    }

    const handleSetUnderlying = (token: any) => {
        setUnderlying(token);
    }

    return(

        <Flex flexFlow="column" style={{minHeight: "100vh"}}>
            <PageHeader>
                Lending Swap
            </PageHeader>
            <Box className="pageContent" flex="1" align="center">
                
                <Box width="600px" class="swapCard" bg={useColorModeValue("gray.50", "gray.900")} pb="6" my={20} rounded={'lg'} align="left">
                    <Flex p="6">
                        <Heading size="md">Swap</Heading>
                    </Flex>

                    <Flex alignItems="center" p="6">
                        <Box>
                            <Text fontSize="">Select Underlying</Text>
                            <TokenSelectModal tokens={underlyingTokens} setToken={handleSetUnderlying} closeModal={() => {setUnderlyingModalOpen(false)}} open={underlyingModalOpen} />
                        </Box>

                        <Box px="6">
                        <Button onClick={() => {setUnderlyingModalOpen(true)}} leftIcon={<TokenIcon size="25px" address={underlying.address} />} rightIcon={<ChevronDownIcon />} variant="outline">{underlying.symbol}</Button>
                        </Box>
                    </Flex>

                    <TokenInput selectedToken={inputToken} tokens={swapOptions} setToken={handleSetInputToken} />
                    <Circle cursor="pointer" position="relative" size='40px' bg={useColorModeValue("gray.100", "gray.900")} color={useColorModeValue("black", "white")} my="-20px" left="50%" ml="-20px" zIndex="2">
                        <ArrowDownIcon />
                    </Circle>
                    <TokenInput selectedToken={outputToken} tokens={swapOptions} setToken={handleSetOutputToken} />

                    <Box flex="1" p="6">
                        <Button w="100%" flex="1" size="lg">
                            Swap
                        </Button>
                    </Box>
                    
                </Box>
                
            </Box>

        </Flex>
    )
}

export default LendingSwap;