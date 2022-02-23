import { Box, Divider, Heading } from "@chakra-ui/layout"

const PageHeader: React.FunctionComponent = ({children}) => {
    return(
        <Box>
            <Heading size="md" py={2}>
                {children}
            </Heading>
            <Divider />
        </Box>
    );
}

export default PageHeader;