import React, { useEffect, useState } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

import { Divider, Flex, Icon, Text } from '@chakra-ui/react';

import getConfig from 'next/config';
import config from '../../../../config/index';
import { useData } from '../../../../hooks/data';

interface DropDownCitiesStyle {
  style: any;
}

const DropDownCities: React.FC<DropDownCitiesStyle> = ({ style }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { publicRuntimeConfig } = getConfig();

  const { cities: citiesData } = useData();

  const [cities, setCities] = useState(() => config.CITIES);

  useEffect(() => {
    if (citiesData?.length > 0) {
      const updatedCities = citiesData.map(item => item.name);

      setCities(updatedCities);
    }
  }, [citiesData]);

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
          {publicRuntimeConfig.STORE_NAME === 'Jardim SP'
            ? 'Bairros de SP'
            : 'Cidades Atendidas'}
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
          top="64px"
          fontSize="12px"
          textTransform="uppercase"
          fontWeight="500"
          zIndex={100000}
          boxShadow="0 1px 3px rgba(0,0,0,0.12)"
          maxHeight="400px"
          overflow="auto"
        >
          {cities.map((city: any) => (
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
