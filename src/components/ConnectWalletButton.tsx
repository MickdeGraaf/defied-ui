import { Button } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";

const ConnectWalletButton = () => {
    const { account, activateBrowserWallet, deactivate } = useEthers();

    const handleConnect = () => {
        activateBrowserWallet();
    }

    const handleDisconnect = () => {
        deactivate();
    }

    console.log(account);

    if(account) {
        return(
            <Button w="100%" onClick={handleDisconnect}>Disconnect Wallet</Button>
        )
    }

    return(
        <Button w="100%" onClick={handleConnect}>Connect Wallet</Button>
    )
}

export default ConnectWalletButton;