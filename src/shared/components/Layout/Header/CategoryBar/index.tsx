import React, { useEffect, useState } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

import { Divider, Flex, Icon, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { useData } from '../../../../hooks/data';

interface CategoryBarStyle {
  style: any;
}

interface MenuDropDownProps {
  category: {
    name: string;
    slug: string;
    subcategories: any[];
  };
  isHoveredMain: boolean;
}

const MenuDropDown: React.FC<MenuDropDownProps> = ({
  category,
  isHoveredMain
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHoveredMain) {
      setIsHovered(false);
    }
  }, [isHoveredMain]);

  return (
    <Flex
      display="flex"
      whiteSpace="nowrap"
      _first={{
        pl: '0px'
      }}
      cursor="pointer"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
    >
      <Link href={`/categorias/${category.slug}`}>
        <Flex
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          px="12px"
          _hover={{
            backgroundColor: 'brand.100',
            color: 'white'
          }}
          onMouseLeave={() => {
            if (isHoveredMain === false) {
              setIsHovered(false);
            }
          }}
        >
          <Text
            fontSize="12px"
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
          top="64px"
          flexDirection="column"
          backgroundColor="white"
          fontSize="14px"
          position="absolute"
          boxShadow="0 1px 3px rgba(0,0,0,0.12)"
          zIndex={1000}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
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

  const [isHoveredMain, setIsHoveredMain] = useState(false);

  return (
    <Flex
      {...style}
      flexWrap="wrap"
      onMouseEnter={() => setIsHoveredMain(true)}
      onMouseLeave={() => setIsHoveredMain(false)}
      position="relative"
    >
      <Flex
        display="flex"
        whiteSpace="nowrap"
        _first={{
          pl: '0px'
        }}
        cursor="pointer"
        position="relative"
      >
        <Link href="/">
          <Flex
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            px="12px"
            _hover={{
              backgroundColor: 'brand.100',
              color: 'white'
            }}
          >
            <Text
              fontSize="12px"
              textTransform="uppercase"
              mr="4px"
              _last={{ mr: '0px' }}
              fontWeight="500"
              lineHeight="14PX"
            >
              Início
            </Text>
          </Flex>
        </Link>
      </Flex>
      {data &&
        data.categories?.header.map(category => (
          <MenuDropDown
            key={category.id}
            category={category}
            isHoveredMain={isHoveredMain}
          />
        ))}
    </Flex>
  );
};

export default CategoryBar;
