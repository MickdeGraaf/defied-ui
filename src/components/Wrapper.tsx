import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";

const Wrapper: React.FunctionComponent = (props) => {

    const { children } = props;

    return(
        <Flex className="wrapper" height="100vh" justifyContent="center" align="stretch">
            <Box maxWidth={1480} width={"100%"} align="stretch">
                {children}
            </Box>
        </Flex> 
    )
}

export default Wrapper;