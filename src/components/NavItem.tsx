import { MenuItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface NavItemProps {
    to: string
}

const NavItem: React.FunctionComponent<NavItemProps> = (props) => {

    const {children, to} = props;

    return(
        <MenuItem
            // borderRadius="md"
            _hover={{
                bg: 'gray.400',
                color: 'white',
            }}
        >   
            <Link to={to}>
                {props.children}
            </Link>
        </MenuItem>
    )
}

export default NavItem;