import { Box } from "@chakra-ui/layout";
import { Menu } from "@chakra-ui/react";
import Logo from "./Logo";
import NavItem from "./NavItem";

const Sidebar: React.FunctionComponent = (props) => {
    return(
        <Box width="240px">
            <Menu>
            <Logo /> 
               <NavItem to="./lending-swap">Lending Swap</NavItem>
               <NavItem to="./e-token-migrate">Migrate Money Market</NavItem>
               <NavItem to="./e-token-migrate">Ethereum Unit Converter</NavItem>
               <NavItem to="./e-token-migrate">Gas Price Checker</NavItem> 
            </Menu>
        </Box>
    )
}

export default Sidebar;