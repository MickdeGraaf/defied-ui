import { Box, Button } from "@chakra-ui/react";
import ConnectWalletButton from "./ConnectWalletButton";

const SideBarRight = () => {
    return(
        <Box py="6" px="2" width="240px">
            <ConnectWalletButton />
        </Box>
    )
}

export default SideBarRight;