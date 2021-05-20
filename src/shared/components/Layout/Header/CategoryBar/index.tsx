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
      whiteSpace="nowrap"
      px="8px"
      alignItems="center"
      color="gray.600"
      mr="8px"
      _first={{
        pl: '0px'
      }}
      cursor="pointer"
    >
      <Text fontSize="16px" textTransform="uppercase" mr="8px">
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
