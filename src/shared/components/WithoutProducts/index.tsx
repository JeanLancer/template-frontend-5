import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const WithoutProducts: React.FC = () => {
  return (
    <Flex width="100%" maxWidth="1200px">
      <Text fontSize="14px" color="gray.700">
        Nenhum produto encontrado
      </Text>
    </Flex>
  );
};

export default WithoutProducts;
