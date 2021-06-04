import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

import { Box, Flex, Icon, Text } from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { HeaderStyles } from '../../../contexts/LayoutContext';
import ButtonsBar from './ButtonsBar';
import CategoryBar from './CategoryBar';
import DropDownCities from './DropDownCities';
import SearchBar from './SearchBar';

import { MobileMenuProps } from './MobileMenu';

const MobileMenu = dynamic<MobileMenuProps>((): any => {
  return import('./MobileMenu');
});

interface HeaderProps {
  styles: HeaderStyles;
}

const Header: React.FC<HeaderProps> = ({ styles }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [hasFirstClickMenuButton, setHasFirstClickMenuButton] = useState(false);

  const handleClickMenuButton = useCallback(() => {
    setHasFirstClickMenuButton(true);
    setIsOpenMenu(oldState => !oldState);
  }, []);

  return (
    <Flex width="100%" flexDirection="column">
      <Flex width="100%" flexDirection="column">
        <Flex
          width="100%"
          backgroundColor={styles.contactBar.backgroundColor}
          justifyContent="center"
        >
          <Flex width="100%" maxWidth="1200px" {...styles.contactBar}>
            <Text>Atendimento das 8h as 24h</Text>
            <Flex alignItems="center">
              <Icon as={FaWhatsapp} mr="8px" />
              <Text>84 23545689654</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          width="100%"
          justifyContent="center"
          backgroundColor={styles.mainBar.backgroundColor}
        >
          <Flex width="100%" maxWidth="1200px" {...styles.mainBar}>
            <Flex height="100%" alignItems="center">
              <Link href="/">
                <Box {...styles.logo} cursor="pointer">
                  <Image
                    layout="responsive"
                    src="/images/logo.png"
                    alt="TODO"
                    width="86"
                    height="50"
                  />
                </Box>
              </Link>
            </Flex>

            <SearchBar style={styles.searchBar} />
            <ButtonsBar
              isOpen={isOpenMenu}
              menuButtonFunction={handleClickMenuButton}
            />
          </Flex>
        </Flex>

        <Flex
          width="100%"
          justifyContent="center"
          backgroundColor={styles.secondBar.backgroundColor}
        >
          <Flex width="100%" maxWidth="1200px" {...styles.secondBar}>
            <CategoryBar style={styles.categoryBar} />
            <DropDownCities style={styles.dropDownCities} />
          </Flex>
        </Flex>
      </Flex>
      <Flex width="100%" position="relative">
        {hasFirstClickMenuButton && (
          <MobileMenu setIsOpenMenu={setIsOpenMenu} isOpen={isOpenMenu} />
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
