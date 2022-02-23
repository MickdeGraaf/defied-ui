import React from 'react';

import { ChakraProvider, Flex } from '@chakra-ui/react'
import { DAppProvider } from '@usedapp/core';
import config from './config/useDapp';
import Wrapper from './components/Wrapper';
import Sidebar from './components/Sidebar';
import { BrowserRouter } from "react-router-dom";
import MainContent from './components/MainContent';
import SideBarRight from './components/SideBarRight';

//@ts-ignore
const App = () => {
  // 2. Use at the root of your app
  return (
    <ChakraProvider>
      <BrowserRouter>
        <DAppProvider config={config}>
          <Wrapper>
            <Flex align="stretch">
              <Sidebar></Sidebar>
              <MainContent></MainContent>
              <SideBarRight />
            </Flex>
          </Wrapper>
        
        </DAppProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
