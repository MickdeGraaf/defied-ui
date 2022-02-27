import { Box, Flex } from "@chakra-ui/react"
import { useEthers } from "@usedapp/core"
import NFTBatchTransferActions from "../components/NFTBatchTransferActions"
import PageHeader from "../components/PageHeader"


const NFTBatchTransfer = () => {

    const {account} =  useEthers()

    return(
        <Flex flexFlow="column" style={{minHeight: "100vh"}}>
            <PageHeader>
                NFT batch transfer
            </PageHeader>
            <Box className="pageContent" flex="1" align="">
                <p>
                Transfer a batch of NFTS in a single smart contract call.
                Currently only supports BSC
                </p>

                {account ? 
                
                    <NFTBatchTransferActions />
            
                : "Connect your wallet to continue"}
            </Box>
        </Flex>
    )
    
}

export default NFTBatchTransfer;