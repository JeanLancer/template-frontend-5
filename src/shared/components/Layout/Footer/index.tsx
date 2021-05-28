import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { FooterStyles } from '../../../contexts/LayoutContext';

interface FooterProps {
  styles: FooterStyles;
}

const Footer: React.FC<FooterProps> = ({ styles }) => {
  const { backgroundColor, ...rest } = styles.copyrightBar;

  return (
    <Flex
      width="100%"
      alignItems="center"
      flexDirection="column"
      mt="auto"
      backgroundColor={backgroundColor}
      boxShadow="0 1px 3px rgba(0,0,0,0.12)"
      borderTop="solid 1px"
      borderColor="gray.200"
    >
      <Flex width="100%" maxWidth="1200px" {...rest}>
        <Text>Copyright © 2015-2021 Eflorista LTDA.</Text>
        <Text>
          CNPJ n.º 09.111.111/0001-11 / Av. teste, nº 3.003, Bonfim, Osasco/SP -
          CEP 00000-190.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
