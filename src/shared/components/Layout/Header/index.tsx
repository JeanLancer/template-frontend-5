import Image from 'next/image';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

import { Box, Flex, Icon, Text } from '@chakra-ui/react';

import { HeaderStyles } from '../../../contexts/LayoutContext';
import ButtonsBar from './ButtonsBar';
import CategoryBar from './CategoryBar';
import DropDownCities from './DropDownCities';
import SearchBar from './SearchBar';

interface HeaderProps {
  styles: HeaderStyles;
}

const Header: React.FC<HeaderProps> = ({ styles }) => {
  return (
    <Flex width="100%" flexDirection="column">
      <Flex width="100%" {...styles.contactBar}>
        <Text>Atendimento das 8h as 24h</Text>
        <Flex alignItems="center">
          <Icon as={FaWhatsapp} mr="8px" />
          <Text>84 23545689654</Text>
        </Flex>
      </Flex>
      <Flex width="100%" {...styles.mainBar}>
        <Box {...styles.logo}>
          <Image
            layout="responsive"
            src="/images/logo.png"
            alt="TODO"
            width={styles.logo.width as any}
            height={styles.logo.height as any}
          />
        </Box>
        <SearchBar style={styles.searchBar} />
        <ButtonsBar />
      </Flex>
      <Flex width="100%" {...styles.secondBar}>
        <CategoryBar style={styles.categoryBar} />
        <DropDownCities style={styles.dropDownCities} />
      </Flex>
    </Flex>
  );
};

export default Header;
