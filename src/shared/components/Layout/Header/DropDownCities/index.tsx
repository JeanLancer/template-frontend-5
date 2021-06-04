import React, { useState } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

import { Divider, Flex, Icon, Text } from '@chakra-ui/react';

import { Style } from '../../../../contexts/LayoutContext';

interface DropDownCitiesStyle {
  style: Style;
}

const DropDownCities: React.FC<DropDownCitiesStyle> = ({ style }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
    >
      <Flex {...style} cursor="pointer">
        <Text
          fontWeight="500"
          textTransform="uppercase"
          fontSize={['11px', '12px']}
        >
          Cidades Atendidas
        </Text>

        {isHovered && <Icon as={BiChevronDown} fontSize="18px" />}
        {!isHovered && <Icon as={BiChevronRight} fontSize="18px" />}
      </Flex>

      {isHovered && (
        <Flex
          width="100%"
          backgroundColor="gray.400"
          flexDirection="column"
          position="absolute"
          top="32px"
          fontSize="12px"
          textTransform="uppercase"
          fontWeight="500"
          cursor="pointer"
        >
          <Flex
            width="100%"
            color="white"
            flexDirection="column"
            px="16px"
            _hover={{ backgroundColor: 'gray.600' }}
          >
            <Text>Tijucas</Text>
            <Divider />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default DropDownCities;
