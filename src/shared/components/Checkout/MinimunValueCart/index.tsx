import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import NumberUtils from '../../../../shared/utils/NumberUtils';

interface MinimumValueCartProps {
  value: number;
}

const MinimumValueCart: React.FC<MinimumValueCartProps> = ({ value }) => {
  return (
    <Flex
      width="100%"
      px="16px"
      py="8px"
      backgroundColor="red.100"
      border="2px solid"
      borderColor="red.500"
      flexDirection="column"
      color="gray.800"
      mb="24px"
    >
      <Text fontSize="16px">Seu carrinho está abaixo do valor mínimo</Text>
      <Flex fontSize="14px">
        <Text mr="8px">
          {`O Valor mínimo de compra é de ${NumberUtils.toCurrency(value)}`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default MinimumValueCart;
