import React from 'react';

import { ChakraProvider, Flex } from '@chakra-ui/react';

import { useLayout } from '../../contexts/LayoutContext';
import Fonts from '../../styles/Fonts';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  const { theme, layoutStyles } = useLayout();

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Flex flexDirection="column" width="100%" minHeight="100vh">
        <Header styles={layoutStyles.header} />
        <Flex width="100%">{children}</Flex>
        <Footer styles={layoutStyles.footer} />
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
