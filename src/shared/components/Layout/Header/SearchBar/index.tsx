import React, { useCallback, useRef } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

import { Box, Flex, Icon, Input, InputProps } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

interface Style {
  style: InputProps;
}

const SearchBar: React.FC<Style> = ({ style }) => {
  const ref = useRef<any>(null);
  const router = useRouter();

  const handleSearch = useCallback(() => {
    if (ref) {
      const query = ref.current.value;

      if (query && query.length > 0) {
        if (query) {
          router.push('/busca/[query]', `/busca/${query}`);
        }
      }
    }
  }, [router]);

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
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
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
        onClick={() => handleSearch()}
      >
        <Icon as={BiSearchAlt2} fontSize="20px" />
      </Box>
    </Flex>
  );
};

export default SearchBar;
