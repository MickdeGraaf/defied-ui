import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout";
import { Button, Circle } from "@chakra-ui/react";
import { ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons'
import PageHeader from "../components/PageHeader";
import TokenInput from "../components/TokenInput";
import { useEffect, useState } from "react";
import { BigNumber, constants, Contract, utils } from "ethers";
import TokenIcon from "../components/TokenIcon";
import TokenSelectModal from "../components/TokenSelectModal";
import lendingMigratorAssets from "../config/lendingMigratorAssets";
import IERC20ABI from "../abis/IERC20.json";
import lendingMigratorConfig from "../config/LendingMigrator.json";
import LendingMigratorABI from "../abis/LendingMigrator.json";
import { useContractFunction, useEthers, useTokenAllowance } from "@usedapp/core";
import { parseUnits } from "ethers/lib/utils";


const functionsIn =  {
    "Euler": "depositEuler",
    "AaveV2": "depositAaveV2",
    "Compound": "depositCompound"
}

const functionsOut = {
    "Euler": "withdrawEuler",
    "AaveV2": "withdrawAaveV2",
    "Compound": "withdrawCompound"
}

const fetchSwapOptionsFromUnderlying = (token: string) => {
    const result: any[] = [];
    // @ts-ignore
    const underlying = lendingMigratorAssets[token];

    result.push({
        address: token,
        decimals: underlying.decimals,
        name: underlying.name,
        symbol: underlying.symbol,
        protocol: underlying.protocol,
        underlying: token
    });

    Object.keys(underlying.lendingTokens).map((key) => {
        // @ts-ignore
        const token_ = underlying.lendingTokens[key];

        result.push({
            address: key,
            decimals: token_.decimals,
            name: token_.name,
            symbol: token_.symbol,
            protocol: token_.protocol,
            underlying: token
        });
    });

    return result;
};


function generateRoute(inputToken: any, outputToken: any) {
    
}


const LendingSwap = () => {
    
    const [underlyingModalOpen, setUnderlyingModalOpen] = useState(false);
    const { account, chainId } = useEthers();
    // @ts-ignore
    const lendingMigratorContractAddress = lendingMigratorConfig[chainId];
    console.log(lendingMigratorContractAddress);
    const lendingMigratorContract = new Contract(lendingMigratorContractAddress ? lendingMigratorContractAddress : constants.AddressZero, LendingMigratorABI);
    const batchFunction = useContractFunction(lendingMigratorContract, "batch");
    console.log(lendingMigratorContract.address)

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

    const [inputAmount, setInputAmount] = useState("");
    const [outputAmount, setOutputAmount] = useState("");


    const bnInputAmount = inputAmount ? parseUnits(inputAmount, inputToken.decimals) : BigNumber.from("0");

    const inputTokenContract = new Contract(inputToken.address, IERC20ABI);

    const inputTokenAllowance = useTokenAllowance(inputToken.address, account, lendingMigratorContract.address);

    const approveFunction = useContractFunction(inputTokenContract, "approve");

    const handleSetInputToken = (token: any) => {
        if(token.address == outputToken.address) {
            swapInputOutput();
            return;
        }

        setInputToken(token);
    }

    const handleSetOutputToken = (token: any) => {
        if(token.address == inputToken.address) {
            swapInputOutput();
            return;
        }

        setOutputToken(token);
    }

    const swapInputOutput = () => {
        const tempInput = inputToken;
        setInputToken(outputToken);
        setOutputToken(tempInput);
    }

    const handleSetUnderlying = (token: any) => {
        setUnderlying(token);
    }

    const handleInputChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.currentTarget.value)
        setInputAmount(e.currentTarget.value);
    }

    const handleApproveClick = () => {
        console.log("approving");
        approveFunction.send(lendingMigratorContract.address, constants.MaxUint256);
    };

    const handleSwapClick = () => {
        const calldata: string[] = [];
        const iface = lendingMigratorContract.interface;
        //pull tokens
        calldata.push(iface.encodeFunctionData("pullToken", [inputTokenContract.address, bnInputAmount]));

        //if not underlying unwrap
        if(inputToken.protocol != "none") {
            // unwrap to account when output should be underlying
            // otherwise unwrap to contract itself
            const unwrapTo = (outputToken.protocol == "none") ? account : constants.AddressZero;
            // @ts-ignore
            calldata.push(iface.encodeFunctionData(functionsOut[inputToken.protocol], [inputToken.address, unwrapTo]))
        }

        //if not swapping to underlying, wrap into lending protocol
        if(outputToken.protocol != "none") {
            // @ts-ignore
            console.log(outputToken);
            // @ts-ignore
            calldata.push(iface.encodeFunctionData(functionsIn[outputToken.protocol], [outputToken.underlying, account]))
        }

        console.log(calldata);

        batchFunction.send(calldata, true);

        //
    }

    // TODO more checks to check if we can swap
    const canSwap = !bnInputAmount.eq(0);

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

                    <TokenInput onUpdate={handleInputChanged} value={inputAmount} selectedToken={inputToken} tokens={swapOptions} setToken={handleSetInputToken} />
                    <Circle cursor="pointer" onClick={swapInputOutput} position="relative" size='40px' bg={useColorModeValue("gray.100", "gray.900")} color={useColorModeValue("black", "white")} my="-20px" left="50%" ml="-20px" zIndex="2">
                        <ArrowDownIcon />
                    </Circle>
                    <TokenInput output value={outputAmount} selectedToken={outputToken} tokens={swapOptions} setToken={handleSetOutputToken} />

                    <Box flex="1" p="6">
                        {inputTokenAllowance && bnInputAmount.gt(inputTokenAllowance) ? 
                            <Button onClick={handleApproveClick} w="100%" flex="1" size="lg">
                                Approve
                            </Button>
                            :
                            <Button onClick={handleSwapClick} disabled={!canSwap} w="100%" flex="1" size="lg">
                                Swap
                            </Button>
                        }
                        
                    </Box>
                    
                </Box>
                
            </Box>

        </Flex>
    )
}

export default LendingSwap;