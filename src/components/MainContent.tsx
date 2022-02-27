import { Box } from "@chakra-ui/layout";
import { Route, Routes } from "react-router";
import LendingSwap from "../pages/LendingSwap";
import NFTBatchTransfer from "../pages/NFTBatchTransfer";
import UnitConverter from "../pages/UnitConverter";

const MainContent = () => {
    return(
        <Box align="stretch" flex={1} alignItems="stretch" style={{minHeight:"100vh"}}>
            <Routes>
                <Route path="/home">Home</Route>
                <Route path="lending-swap"  element={<LendingSwap />}/>
                <Route path="unit-converter" element={<UnitConverter />} />
                <Route path="nft-batch-transfer" element={<NFTBatchTransfer />} />
            </Routes>
        </Box>
    );
}

export default MainContent;