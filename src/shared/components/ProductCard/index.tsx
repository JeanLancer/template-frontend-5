import { Flex, Text, Icon } from '@chakra-ui/react';
import React, { memo } from 'react';
import { BiCartAlt } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrices from './ProductPrices';

interface ProductDTO {
  id: string;
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
      width={['100%', '50%', '50%', '25%']}
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
        alignItems="center"
        cursor="pointer"
      >
        <Link href={`/${product.slug}`}>
          <Image
            layout="fixed"
            width={280}
            height={280}
            src={product.url_thumb}
            alt={product.name}
          />
        </Link>

        <Link href={`/${product.slug}`}>
          <Flex width="100%" height="48px" alignItems="center">
            <Text
              fontSize="12.2px"
              whiteSpace="inherit"
              my="8px"
              fontWeight="500"
              color="brand.300"
              lineHeight="16px"
              cursor="pointer"
              _hover={{
                color: 'brand.100'
              }}
            >
              {product.name}
            </Text>
          </Flex>
        </Link>

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

          <Link href={`/${product.slug}`}>
            <Flex
              backgroundColor="brand.100"
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
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(ProductCard, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});
