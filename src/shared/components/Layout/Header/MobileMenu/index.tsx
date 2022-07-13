import React, { useCallback, useState } from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { BiDetail, BiFilterAlt, BiHome } from 'react-icons/bi';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import ArrowBox from '../../../ArrowBox';
import { useData } from '../../../../hooks/data';
import Info from '../Info';

export interface MobileMenuProps {
  isOpen: boolean;
  setIsOpenMenu: (isOpen: boolean) => void;
}

const CategoryMenu: React.FC<any> = ({ category, handleClickMenu }) => {
  const [showSubcategories, setShowSubcategories] = useState(false);

  return (
    <Flex
      width="100%"
      alignItems="center"
      px="24px"
      py="4px"
      color="gray.800"
      fontSize="12px"
      flexDirection="column"
    >
      <Flex width="100%" alignItems="center">
        <Text
          ml="48px"
          mr="16px"
          onClick={() => handleClickMenu(`/categorias/${category.slug}`)}
          textTransform="uppercase"
        >
          {category.name}
        </Text>

        {category.subcategories.length > 0 && (
          <Icon
            as={showSubcategories ? FiChevronDown : FiChevronRight}
            fontSize="16px"
            onClick={() => setShowSubcategories(!showSubcategories)}
          />
        )}
      </Flex>

      {showSubcategories && (
        <Flex width="100%" flexDirection="column" ml="40px" mt="8px">
          {category.subcategories.map((subcategory: any) => (
            <Flex py="2px">
              <Text
                ml="48px"
                mr="4px"
                onClick={() =>
                  handleClickMenu(`/categorias/${subcategory.slug}`)
                }
                textTransform="uppercase"
              >
                {subcategory.name}
              </Text>
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpenMenu }) => {
  const variants: Variants = {
    open: {
      opacity: 1,
      zIndex: 1000,
      height: '100vh',
      display: 'block'
    },
    closed: {
      opacity: 0,
      zIndex: 1000,
      height: '0px',
      display: 'none'
    }
  };

  const router = useRouter();

  const handleClickMenu = useCallback(
    (link = '/') => {
      router.push(link).then(() => setIsOpenMenu(false));
    },
    [setIsOpenMenu, router]
  );

  const data = useData();

  return (
    <motion.nav
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{
        delay: 0.25
      }}
    >
      <Flex
        display={['flex', 'flex', 'none']}
        width="100%"
        backgroundColor="white"
        height="100%"
        position="absolute"
        zIndex={1000}
        boxShadow="0 1px 3px rgba(0,0,0,0.12)"
      >
        <Flex width="100%" flexDirection="column" position="relative">
          <ArrowBox
            right={['52px']}
            boxShadow="0 1px 3px rgba(0,0,0,0.12)"
            top="-8px"
            backgroundColor="gray.50"
          />
          <Flex
            width="100%"
            fontSize="12px"
            justifyContent="space-between"
            backgroundColor="gray.50"
            color="gray.600"
            py="8px"
            px="16px"
            boxShadow="0 1px 3px rgba(0,0,0,0.12)"
          >
            <Text width="50%">
              <Info />
            </Text>
            <Flex
              fontSize="12px"
              width="50%"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Flex
                alignItems="center"
                onClick={() => {
                  window.location.href = `tel:+55${data.general_settings?.telephone?.replace(
                    /\D/g,
                    ''
                  )}`;
                }}
              >
                <Icon as={FaPhone} mr="4px" />
                <Text>{data.general_settings?.telephone}</Text>
              </Flex>

              <Flex
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
                <Icon as={FaWhatsapp} mr="4px" />
                <Text>{data.general_settings?.whatsapp}</Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            width="100%"
            flexDirection="column"
            backgroundColor="white"
            mt="16px"
          >
            <Flex
              width="100%"
              alignItems="center"
              px="24px"
              py="8px"
              color="gray.800"
              onClick={() => handleClickMenu()}
            >
              <Icon as={BiHome} mr="16px" fontSize="20px" />
              <Text fontSize="14px">Início</Text>
            </Flex>

            <Flex
              width="100%"
              alignItems="center"
              px="24px"
              py="8px"
              color="gray.800"
              onClick={() => handleClickMenu('acompanhar-meu-pedido')}
            >
              <Icon as={BiDetail} mr="16px" fontSize="20px" />
              <Text fontSize="14px">Acompanhar Pedido</Text>
            </Flex>

            <Flex
              width="100%"
              alignItems="center"
              px="24px"
              py="8px"
              color="gray.800"
            >
              <Icon as={BiFilterAlt} mr="16px" fontSize="20px" />
              <Text fontSize="14px">Categorias</Text>
            </Flex>

            {data.categories?.header.map(category => (
              <CategoryMenu
                key={category.id}
                category={category}
                handleClickMenu={handleClickMenu}
              />
            ))}

            <Flex
              width="100%"
              alignItems="center"
              px="24px"
              py="8px"
              color="gray.800"
              onClick={() => handleClickMenu('complementos')}
            >
              <Icon as={BiFilterAlt} mr="16px" fontSize="20px" />
              <Text fontSize="14px">Complementos</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </motion.nav>
  );
};

export default MobileMenu;
