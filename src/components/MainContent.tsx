import { Box } from "@chakra-ui/layout";
import { Route, Routes } from "react-router";
import LendingSwap from "../pages/LendingSwap";

const MainContent = () => {
    return(
        <Box align="stretch" flex={1} alignItems="stretch" style={{minHeight:"100vh"}}>
            <Routes>
                <Route path="/home">Home</Route>
                <Route path="lending-swap"  element={<LendingSwap />}/>
            </Routes>
        </Box>
    );
}

export default MainContent;