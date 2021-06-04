import React, { useEffect, useState } from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { useLayout } from '../../contexts/LayoutContext';
import Footer from './Footer';
import Header from './Header';
import DisabledSite from './DisabledSite';
import { CartProvider } from '../../hooks/cart';
import { ConfigProvider } from '../../hooks/data';

const Layout: React.FC = ({ children }) => {
  const { theme, layoutStyles } = useLayout();

  const [isSiteEnabled, setIsSiteEnable] = useState(false);

  useEffect(() => {
    setIsSiteEnable(true);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {isSiteEnabled && (
        <ConfigProvider>
          <CartProvider>
            <Flex flexDirection="column" width="100%" minHeight="100vh">
              <Header styles={layoutStyles.header} />
              <Flex width="100%" justifyContent="center">
                {children}
              </Flex>
              <Footer styles={layoutStyles.footer} />
            </Flex>
          </CartProvider>
        </ConfigProvider>
      )}

      {!isSiteEnabled && <DisabledSite />}
    </ChakraProvider>
  );
};

export default Layout;
