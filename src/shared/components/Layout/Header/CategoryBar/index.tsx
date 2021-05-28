import React from 'react';
import { BiChevronDown } from 'react-icons/bi';

import { Flex, Icon, Text } from '@chakra-ui/react';

import { Style } from '../../../../contexts/LayoutContext';

interface CategoryBarStyle {
  style: Style;
}

interface MenuDropDownProps {
  name: string;
  slug: string;
}

const MenuDropDown: React.FC<MenuDropDownProps> = ({ name }) => {
  return (
    <Flex
      display="flex"
      whiteSpace="nowrap"
      px="8px"
      alignItems="center"
      color="gray.600"
      _first={{
        pl: '0px'
      }}
      cursor="pointer"
    >
      <Text
        fontSize="12px"
        textTransform="uppercase"
        mr="4px"
        _last={{ mr: '0px' }}
        fontWeight="500"
      >
        {name}
      </Text>
      <Icon as={BiChevronDown} fontSize="20px" />
    </Flex>
  );
};

const CategoryBar: React.FC<CategoryBarStyle> = ({ style }) => {
  return (
    <Flex {...style}>
      <MenuDropDown name="Arranjos" slug="Arranjos" />
      <MenuDropDown name="Buquês" slug="Buquês" />
      <MenuDropDown name="Cestas e Kits" slug="Cestas e Kits" />
      <MenuDropDown name="Dia das Mães" slug="Dia das Mães" />
      <MenuDropDown name="Ocasiões" slug="Ocasiões" />
    </Flex>
  );
};

export default CategoryBar;
