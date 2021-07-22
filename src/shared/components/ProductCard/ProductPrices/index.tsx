import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import NumberUtils from '../../../utils/NumberUtils';

interface PricesProps {
  priceSale: string;
  pricePromotional: string;
  isPromotional: boolean;
}

const ProductPrices: React.FC<PricesProps> = ({
  priceSale,
  pricePromotional,
  isPromotional
}) => {
  if (isPromotional) {
    return (
      <Flex flexDirection="column" fontSize="14px" lineHeight="14px" pb="4px">
        <Text color="gray.300" textDecoration="line-through" mb="2px">
          {`De ${NumberUtils.toCurrency(priceSale)}`}
        </Text>
        <Text fontSize="16px" color="brand.300">
          {`Por ${NumberUtils.toCurrency(pricePromotional)}`}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" fontSize="16px">
      <Text color="brand.300">{NumberUtils.toCurrency(priceSale)}</Text>
    </Flex>
  );
};

export default ProductPrices;
