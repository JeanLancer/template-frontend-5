import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const EmptyCart: React.FC = () => {
  return (
    <Flex
      width="100%"
      backgroundColor="gray.200"
      py="16px"
      justifyContent="center"
      color="gray.500"
    >
      <Text fontSize="20px">Seu carrinho está vázio.</Text>
    </Flex>
  );
};

export default EmptyCart;
