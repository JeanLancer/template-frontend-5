import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';

import { Box, Flex, Icon, Text } from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FiInstagram } from 'react-icons/fi';
import ButtonsBar from './ButtonsBar';
import CategoryBar from './CategoryBar';
import DropDownCities from './DropDownCities';
import SearchBar from './SearchBar';

import { MobileMenuProps } from './MobileMenu';
import config from '../../../config/index';
import { useData } from '../../../hooks/data';
import Info from './Info';

const MobileMenu = dynamic<MobileMenuProps>((): any => {
  return import('./MobileMenu');
});

interface HeaderProps {
  styles: any;
}

const Header: React.FC<HeaderProps> = ({ styles }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [hasFirstClickMenuButton, setHasFirstClickMenuButton] = useState(false);

  const data = useData();

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
          <Flex
            width="100%"
            maxWidth="1200px"
            {...styles.contactBar}
            justifyContent={['flex-end', 'flex-end', 'space-between']}
          >
            <Text display={['none', 'none', 'block']}>
              <Info />
            </Text>

            <Flex>
              <Flex alignItems="center" mr="24px">
                <Icon as={FaPhone} mr="8px" color={styles.contactBar.color2} />
                <Text color={styles.contactBar.color3}>
                  {data.general_settings?.telephone}
                </Text>
              </Flex>

              <Flex
                mr="24px"
                cursor="pointer"
                alignItems="center"
                onClick={() => {
                  window.open(
                    `https://api.whatsapp.com/send/?phone=55${data.general_settings?.whatsapp?.replace(
                      /\D/g,
                      ''
                    )}&text&app_absent=0`,
                    '_blank'
                  );
                }}
              >
                <Icon
                  as={FaWhatsapp}
                  mr="8px"
                  color={styles.contactBar.color2}
                />
                <Text color={styles.contactBar.color3}>
                  {data.general_settings?.whatsapp}
                </Text>
              </Flex>

              {config.INSTAGRAM && (
                <Flex alignItems="center" cursor="pointer">
                  <Link href={`https://www.instagram.com/${config.INSTAGRAM}/`}>
                    <Icon
                      as={FiInstagram}
                      mr="8px"
                      color={styles.contactBar.color2}
                    />
                  </Link>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>

        <Flex
          width="100%"
          justifyContent="center"
          backgroundColor={styles.mainBar.backgroundColor}
        >
          <Flex
            width="100%"
            maxWidth="1200px"
            {...styles.mainBar}
            alignItems="center"
          >
            <Flex height="100%" alignItems="center">
              <Link href="/">
                <Box cursor="pointer" {...styles.logo} position="relative">
                  <Image
                    layout="fill"
                    src={`/images/logo-${styles.logo.src}`}
                    alt={config.STORE.NAME}
                    quality="100"
                  />
                </Box>
              </Link>
            </Flex>

            <SearchBar style={styles.searchBar} />

            <Flex display={['none', 'none', 'block']}>
              <Link href="/acompanhar-meu-pedido">
                <Text
                  fontSize="10px"
                  textTransform="uppercase"
                  fontWeight="500"
                  cursor="pointer"
                  ml="48px"
                  textAlign="center"
                  _hover={{
                    textDecoration: 'underline'
                  }}
                >
                  Acompanhar Pedido
                </Text>
              </Link>
            </Flex>

            <ButtonsBar
              isOpen={isOpenMenu}
              menuButtonFunction={handleClickMenuButton}
            />
          </Flex>
        </Flex>

        <Flex
          display={['block', 'block', 'none']}
          width="100%"
          height="80px"
          maxWidth="100vh"
        >
          <Flex width="100%" overflow="auto" px="16px">
            {data.categories?.default.map(category => (
              <Link href={`/categorias/${category.slug}`}>
                <Flex
                  width="800px"
                  flexDirection="column"
                  justifyContent="end"
                  mr="24px"
                  whiteSpace="nowrap"
                >
                  <Image src={category.icon_url} width="60px" height="60px" />

                  <Text>{category.name}</Text>
                </Flex>
              </Link>
            ))}
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
