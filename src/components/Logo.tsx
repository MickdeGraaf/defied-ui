import { Box, Menu, MenuItem, Text } from "@chakra-ui/react"

const Logo = () => {
    return(
        // <Box>
        <MenuItem>
            <Text
                // display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                DEFIED
            </Text>
        </MenuItem>
    //   </Box>
        
    )
}

export default Logo;