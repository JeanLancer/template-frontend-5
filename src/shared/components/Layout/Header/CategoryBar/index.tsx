import React, { useCallback, useEffect, useState } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

import { Divider, Flex, Icon, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { useData } from '../../../../hooks/data';
import config from '../../../../config';

interface CategoryBarStyle {
  style: any;
}

interface MenuDropDownProps {
  category: {
    id: string;
    name: string;
    slug: string;
    subcategories: any[];
  };
  isHoveredMain: boolean;
  isHover: boolean;
  onHoverChild: any;
}

const MenuDropDownPage: React.FC<any> = ({ page, isHoveredMain }) => {
  const [, setIsHovered] = useState(false);

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
      <Link href={`/paginas/${page.slug}`}>
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
            {page.title}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

const MenuDropDown: React.FC<MenuDropDownProps> = ({
  category,
  isHoveredMain,
  isHover,
  onHoverChild
}) => {
  useEffect(() => {
    if (!isHoveredMain) {
      onHoverChild(category.id, false);
    }
  }, [category, isHoveredMain, onHoverChild]);

  return (
    <Flex
      display="flex"
      whiteSpace="nowrap"
      _first={{
        pl: '0px'
      }}
      cursor="pointer"
      position="relative"
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
          onMouseEnter={() => onHoverChild(category.id, true)}
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

          {!isHover && category.subcategories.length > 0 && (
            <Icon as={BiChevronRight} fontSize="16px" />
          )}

          {isHover && category.subcategories.length > 0 && (
            <Icon as={BiChevronDown} fontSize="16px" />
          )}
        </Flex>
      </Link>

      {isHover && category.subcategories.length > 0 && (
        <Flex
          top="64px"
          flexDirection="column"
          backgroundColor="white"
          fontSize="14px"
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
                color="gray.800"
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
  const [isHoveredChild, setIsHoveredChild] = useState({} as any);

  const handleHoverChild = useCallback((id: string, value: boolean) => {
    setIsHoveredChild((oldState: any) => {
      const updatedState = oldState;

      if (updatedState[id] === undefined) {
        updatedState[id] = false;
      } else {
        Object.keys(updatedState).forEach(key => {
          if (key === id) {
            updatedState[key] = value;
          } else {
            updatedState[key] = false;
          }
        });
      }

      return { ...updatedState };
    });
  }, []);

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
              In??cio
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
            isHover={isHoveredChild[category.id]}
            onHoverChild={handleHoverChild}
          />
        ))}

      {config.STORE.NAME !== 'Flor da Mar' &&
        config.STORE.NAME !== 'Floricultura Se Flor para Ser' &&
        config.STORE.NAME !== 'Acalanto' &&
        config.STORE.NAME !== 'Florescer Floripa' && (
          <Flex
            justifyContent="center"
            alignItems="center"
            px="12px"
            cursor="pointer"
            _hover={{
              backgroundColor: 'brand.100',
              color: 'white'
            }}
            fontSize="12px"
            fontWeight="500"
          >
            <Link href="/complementos">
              <Text>COMPLEMENTOS</Text>
            </Link>
          </Flex>
        )}

      {data &&
        data.categories?.pages.map(page => (
          <MenuDropDownPage
            key={page.id}
            page={page}
            isHoveredMain={isHoveredMain}
          />
        ))}
    </Flex>
  );
};

export default CategoryBar;
