import { Flex, Text, Icon } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import { BiCartAlt } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import ProductPrices from './ProductPrices';
import ProductImageLoader from './ProductImageLoader';
import { useLayout } from '../../contexts/LayoutContext';

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
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { layoutStyles } = useLayout();

  const variants: Variants = {
    loaded: {
      opacity: 1
    },
    closed: {
      opacity: 0
    }
  };

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
        overflow="hidden"
        position="relative"
      >
        {isImageLoaded === false && (
          <Flex
            width="280px"
            height="280px"
            top="0"
            position="absolute"
            mx="auto"
          >
            <ProductImageLoader />
          </Flex>
        )}

        <Link href={`/${product.slug}`}>
          <motion.nav
            initial="closed"
            animate={isImageLoaded ? 'loaded' : 'loading'}
            variants={variants}
            transition={{
              delay: 0.1
            }}
          >
            <Image
              layout="fixed"
              width={280}
              height={280}
              src={product.url_thumb}
              alt={product.name}
              onLoad={() => setIsImageLoaded(true)}
            />
          </motion.nav>
        </Link>

        <Link href={`/${product.slug}`}>
          <Flex
            width="100%"
            height="48px"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontSize={['12.2px', '12px', '14px']}
              whiteSpace="inherit"
              my="8px"
              fontWeight="500"
              color="brand.300"
              lineHeight="16px"
              cursor="pointer"
              _hover={{
                color: 'brand.100'
              }}
              textAlign="center"
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
              backgroundColor={layoutStyles.productCard.button.backgroundColor}
              color={layoutStyles.productCard.button.color}
              alignItems="center"
              px="8px"
              py="8px"
              cursor="pointer"
              borderRadius="2px"
            >
              <Text fontSize="12px" fontWeight="500" mr="8px" color="white">
                COMPRAR
              </Text>

              <Icon
                as={BiCartAlt}
                fontSize="18px"
                color={layoutStyles.productCard.button.color2}
              />
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
// #
//
