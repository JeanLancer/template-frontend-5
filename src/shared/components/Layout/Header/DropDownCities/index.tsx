import React, { useState } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

import { Divider, Flex, Icon, Text } from '@chakra-ui/react';

import { Style } from '../../../../contexts/LayoutContext';

import config from '../../../../config/index';

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
          backgroundColor="white"
          flexDirection="column"
          position="absolute"
          top="40px"
          fontSize="12px"
          textTransform="uppercase"
          fontWeight="500"
          zIndex={100000}
          boxShadow="0 1px 3px rgba(0,0,0,0.12)"
        >
          {config.CITIES.map((city: any) => (
            <>
              <Flex
                width="100%"
                color="brand.300"
                flexDirection="column"
                px="16px"
                py="8px"
              >
                <Text>{city}</Text>
                <Divider />
              </Flex>
            </>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default DropDownCities;
