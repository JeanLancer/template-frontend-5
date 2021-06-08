import React, { useState } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

import { Divider, Flex, Icon, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { Style } from '../../../../contexts/LayoutContext';
import { useData } from '../../../../hooks/data';

interface CategoryBarStyle {
  style: Style;
}

interface MenuDropDownProps {
  category: {
    name: string;
    slug: string;
    subcategories: any[];
  };
}

const MenuDropDown: React.FC<MenuDropDownProps> = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      minWidth="96px"
      display="flex"
      whiteSpace="nowrap"
      color="gray.600"
      _first={{
        pl: '0px'
      }}
      cursor="pointer"
      position="relative"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Link href={`/categorias/${category.slug}`}>
        <Flex
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          px="8px"
          _hover={{
            backgroundColor: 'brand.100',
            color: 'white'
          }}
        >
          <Text
            fontSize="10px"
            textTransform="uppercase"
            mr="4px"
            _last={{ mr: '0px' }}
            fontWeight="500"
            lineHeight="14PX"
          >
            {category.name}
          </Text>

          {!isHovered && category.subcategories.length > 0 && (
            <Icon as={BiChevronRight} fontSize="16px" />
          )}

          {isHovered && category.subcategories.length > 0 && (
            <Icon as={BiChevronDown} fontSize="16px" />
          )}
        </Flex>
      </Link>

      {isHovered && category.subcategories.length > 0 && (
        <Flex
          width="100%"
          mt="24px"
          flexDirection="column"
          backgroundColor="white"
          fontSize="12px"
          top="8px"
          left="0px"
          position="absolute"
          boxShadow="0 1px 3px rgba(0,0,0,0.12)"
          zIndex={1000}
        >
          {category.subcategories.map(subcategory => (
            <Link href={`/categorias/${subcategory.slug}`}>
              <Flex
                px="8px"
                py="4px"
                width="100%"
                mb="4px"
                _last={{ mb: '0px' }}
                flexDirection="column"
                _hover={{
                  backgroundColor: 'brand.100',
                  color: 'white'
                }}
              >
                <Text>{subcategory.name}</Text>

                <Divider mt="2px" />
              </Flex>
            </Link>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

const CategoryBar: React.FC<CategoryBarStyle> = ({ style }) => {
  const data = useData();

  return (
    <Flex {...style} flexWrap="wrap">
      {data &&
        data.categories?.header.map(category => (
          <MenuDropDown key={category.id} category={category} />
        ))}
    </Flex>
  );
};

export default CategoryBar;
