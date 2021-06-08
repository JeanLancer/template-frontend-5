import React, { useCallback, useState } from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { BiFilterAlt, BiHome } from 'react-icons/bi';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import ArrowBox from '../../../ArrowBox';
import { useData } from '../../../../hooks/data';
import config from '../../../../config/index';

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
      opacity: 1
    },
    closed: {
      opacity: 0
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
    >
      <Flex
        display={['flex', 'flex', 'none']}
        width="100%"
        backgroundColor="white"
        height="100vh"
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
            <Text width="50%">{config.HEADER_TEXT}</Text>
            <Flex
              fontSize="10px"
              width="50%"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Flex alignItems="center">
                <Icon as={FaPhone} mr="4px" />
                <Text>{data?.general_settings?.telephone}</Text>
              </Flex>

              <Flex alignItems="center">
                <Icon as={FaWhatsapp} mr="4px" />
                <Text>{data?.general_settings?.whatsapp}</Text>
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
              backgroundColor="gray.50"
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
          </Flex>
        </Flex>
      </Flex>
    </motion.nav>
  );
};

export default MobileMenu;
