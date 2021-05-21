import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { BiCartAlt } from 'react-icons/bi';
import Image from 'next/image';
import ProductPrices from './ProductPrices';

interface ProductDTO {
  name: string;
  slug: string;
  url_thumb: string;

  price_sale: string;
  price_promotional: string;

  is_promotional: boolean;
}

interface ProductCardProps {
  product: ProductDTO;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Flex
      width={['100%', '100%', '50%', '25%', '25%', '20%']}
      flexDirection="column"
      alignItems="center"
      px="8px"
      pb="32px"
    >
      <Flex
        width="100%"
        flexDirection="column"
        boxShadow="0 1px 3px rgba(0,0,0,0.12)"
        px="8px"
        pb="8px"
      >
        <Box
          width="100%"
          height="160px"
          backgroundColor="gray.300"
          position="relative"
        >
          <Image layout="fill" src={product.url_thumb} alt={product.name} />
          {/* <Flex
          width="100%"
          backgroundColor="gray.500"
          color="white"
          rotate="45px"
          justifyContent="center"
          position="absolute"
          bottom="16px"
        >
          <Text fontSize="12px" textTransform="uppercase" textAlign="center">
            ENTREGA GRÁTIS
          </Text>
        </Flex> */}
        </Box>

        <Flex width="100%" height="48px" alignItems="center">
          <Text
            fontSize="12.2px"
            whiteSpace="inherit"
            my="8px"
            fontWeight="500"
            color="gray.600"
            lineHeight="16px"
          >
            {product.name}
          </Text>
        </Flex>

        <Flex
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          mt="auto"
        >
          <ProductPrices
            isPromotional={product.is_promotional}
            priceSale={product.price_sale}
            pricePromotional={product.price_promotional}
          />
          <Flex
            backgroundColor="gray.500"
            color="white"
            alignItems="center"
            px="8px"
            py="4px"
            cursor="pointer"
            borderRadius="2px"
          >
            <Text fontSize="12px" fontWeight="500" mr="8px">
              COMPRAR
            </Text>

            <Icon as={BiCartAlt} fontSize="18px" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
