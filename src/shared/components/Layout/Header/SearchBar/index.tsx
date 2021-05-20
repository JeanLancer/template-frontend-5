import React, { useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import { Box, Flex, Icon, Input, InputProps } from "@chakra-ui/react";

interface Style {
  style: InputProps;
}

const SearchBar: React.FC<Style> = ({ style }) => {
  const ref = useRef(null);

  const { width, maxWidth, ...rest } = style;

  return (
    <Flex
      width={width}
      maxWidth={maxWidth}
      position="relative"
      alignItems="center"
    >
      <Input
        ref={ref}
        name="query"
        placeholder="Pesquisar produtos"
        pr="64px"
        {...rest}
      />

      <Box
        position="absolute"
        right="0"
        px="16px"
        borderLeft="1px"
        borderColor="gray.300"
        color="gray.500"
        zIndex={10}
        cursor="pointer"
      >
        <Icon as={BiSearchAlt2} fontSize="24px" />
      </Box>
    </Flex>
  );
};

export default SearchBar;
