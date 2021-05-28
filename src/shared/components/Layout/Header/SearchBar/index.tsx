import React, { useRef } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

import { Box, Flex, Icon, Input, InputProps } from '@chakra-ui/react';

interface Style {
  style: InputProps;
}

const SearchBar: React.FC<Style> = ({ style }) => {
  const ref = useRef(null);

  return (
    <Flex
      width="100%"
      maxWidth={['600px', '600px', '600px', '800px']}
      position="relative"
      alignItems="center"
    >
      <Input
        ref={ref}
        name="query"
        placeholder="Pesquisar produtos"
        pr="64px"
        fontSize="12px"
        {...style}
      />

      <Box
        position="absolute"
        right="0"
        px="8px"
        borderLeft="1px"
        pr="4px"
        borderColor="gray.300"
        color="gray.500"
        zIndex={10}
        cursor="pointer"
      >
        <Icon as={BiSearchAlt2} fontSize="20px" />
      </Box>
    </Flex>
  );
};

export default SearchBar;
