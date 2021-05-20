import React from "react";
import { BiChevronDown } from "react-icons/bi";

import { Flex, Icon, Text } from "@chakra-ui/react";

import { Style } from "../../../../contexts/LayoutContext";

interface DropDownCitiesStyle {
  style: Style;
}

const DropDownCities: React.FC<DropDownCitiesStyle> = ({ style }) => {
  return (
    <Flex {...style} cursor="pointer">
      <Text fontWeight="500" textTransform="uppercase" fontSize="14px">
        Cidades Atendidas
      </Text>
      <Icon as={BiChevronDown} fontSize="20px" />
    </Flex>
  );
};

export default DropDownCities;
