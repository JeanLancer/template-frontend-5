import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { FooterStyles } from '../../../contexts/LayoutContext';

interface FooterProps {
  styles: FooterStyles;
}

const Footer: React.FC<FooterProps> = ({ styles }) => {
  return (
    <Flex width="100%" flexDirection="column" mt="auto">
      <Flex {...styles.copyrightBar}>
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
