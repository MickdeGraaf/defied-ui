import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "ethers/lib/utils";
import { Text } from "@chakra-ui/react";
import { constants } from "ethers";

interface TokenBalanceProps {
    address: string;
    decimals: number;
}

const TokenBalance = ({address, decimals}: TokenBalanceProps) => {
    
    const { account } = useEthers();

    const tokenBalance = useTokenBalance(address, account);
    const etherBalance = useEtherBalance(account);

    const balance = address == constants.AddressZero ? etherBalance : tokenBalance;
    
    return(
        <Text> {balance ? formatUnits(balance, decimals) : "-"} </Text>
    )
}

export default TokenBalance;