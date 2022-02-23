import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import lendingMigratorAssets from "../config/lendingMigratorAssets";
import TokenIcon from "./TokenIcon";

interface SetToken {
    (token: any): void
}

interface CloseModal {
    (): void
}

interface TokenSelectModalProps {
    closeModal: CloseModal,
    setToken: SetToken,
    open: boolean,
    title?: string
    // TODO type below
    tokens: any[];
}

const TokenSelectModal: React.FunctionComponent<TokenSelectModalProps> = ({open, closeModal, title, tokens, setToken}) => {

    return(
        <Modal isOpen={open} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title || "Select Token"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Input placeholder='Search' /> */}

            <Box paddingTop="">

                {tokens.map((token) => {
                    return(
                        <Flex 
                            _hover={{
                                bg: 'gray.200',
                                // color: 'white',
                            }} 
                            cursor="pointer"
                            py="3"
                            px="1"
                            borderRadius="md"
                            onClick={() => {setToken(token); closeModal()}}
                        >
                            <TokenIcon size="30px" address={token.address} />
                            <Box flex="1">
                                <Text weight="bold" px="2">{token.symbol}</Text>
                            </Box>
                            <Text> 0.1 </Text>
                        </Flex>
                    );
                })}

            </Box>
          </ModalBody>

          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default TokenSelectModal;