import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Heading, Icon } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { FiMinus, FiPlus } from 'react-icons/fi';
import Head from 'next/head';
import apiGateway from '../../shared/services/apiGateway';
import NumberUtils from '../../shared/utils/NumberUtils';
import { useLayout } from '../../shared/contexts/LayoutContext';
import { useCart } from '../../shared/hooks/cart';
import config from '../../shared/config/index';
import ComplementsList from '../../shared/components/ComplementsList';

interface ProductDetailsPageProps {
  product: any;
  complements: any[];
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { slug } = ctx.params as { slug: string };

  const response = await apiGateway.get<any>(
    `/catalog/products/${slug}/detailed`
  );

  const response2 = await apiGateway.get<any[]>('/catalog/complements');

  const product = response.data;
  const complements = response2.data;

  return { props: { product, complements } };
};

const ProductDetailsPage: NextPage<ProductDetailsPageProps> = ({
  product,
  complements
}): JSX.Element => {
  const { globals } = useLayout();

  const [quantity, setQuantity] = useState(1);

  const { addToCart, removeToCart, hasOnCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(product.url_web);
  }, [product]);

  return (
    <>
      <Head key="product">
        <title>{`${product?.name} - ${config.STORE.NAME}`}</title>
        <meta
          name="description"
          content={`${product.meta_description} - ${config.STORE.NAME}`}
        />
      </Head>
      <Flex
        width="100%"
        maxWidth="1200px"
        alignItems="space-between"
        py="24px"
        px={globals.paddingX}
        flexDirection="column"
      >
        <Flex width="100%" flexDirection={['column', 'column', 'row']}>
          <Flex width={['100%', '100%', '50%']}>
            <Flex flexDirection="column" mr={['0px', '0px', '8px']}>
              {product &&
                product.images.map((image: any, index: any) => (
                  <Box
                    key={image.id}
                    width={['56px', '64px', '72px', '80px']}
                    height={['56px', '64px', '72px', '80px']}
                    backgroundColor="gray.400"
                    mb="8px"
                    _last={{ mb: '0px' }}
                    position="relative"
                    border="2px solid"
                    borderColor="gray.200"
                    cursor="pointer"
                    onClick={() => setSelectedImage(image.url_web)}
                  >
                    <Image
                      layout="fill"
                      src={image.url_thumb}
                      alt={`thumb-${product.slug}-${index}`}
                    />
                  </Box>
                ))}
            </Flex>

            <Flex
              width="100%"
              height="100%"
              ml="8px"
              justifyContent="center"
              alignItems="center"
            >
              <Box width="100%" maxWidth="294px" position="relative">
                {selectedImage && (
                  <Image
                    key={selectedImage}
                    src={selectedImage as any}
                    layout="responsive"
                    width="100%"
                    height="100%"
                    quality={100}
                    alt={product.name}
                  />
                )}
              </Box>
            </Flex>
          </Flex>

          <Flex
            width={['100%', '100%', '50%']}
            height="100%"
            flexDirection="column"
            px={['0px', '0px', '24px']}
            mt={['24px', '24px', '0px']}
          >
            <Heading
              as="h1"
              fontWeight="500"
              fontSize={['20px', '20px', '24px']}
              textTransform="uppercase"
              color="brand.300"
            >
              {product.name}
            </Heading>

            <Text
              whiteSpace="pre-wrap"
              fontSize="14px"
              lineHeight="18px"
              mt="48px"
              color="brand.300"
            >
              {product.description}
            </Text>

            <Flex width="100%" mt="48px" flexDirection="column">
              <Flex>
                {!product.is_promotional && (
                  <Flex>
                    <Text color="gray.800" fontSize="16px">
                      {NumberUtils.toCurrency(product.price_sale * quantity)}
                    </Text>
                  </Flex>
                )}

                {product.is_promotional && (
                  <Flex flexDirection="column">
                    <Text
                      textDecoration="line-through"
                      color="gray.500"
                      fontSize="16px"
                    >
                      {`De ${NumberUtils.toCurrency(
                        product.price_sale * quantity
                      )}`}
                    </Text>
                    <Text color="gray.800" fontSize="20px">
                      {`Por Apenas ${NumberUtils.toCurrency(
                        product.price_promotional * quantity
                      )}`}
                    </Text>
                  </Flex>
                )}
              </Flex>

              {true && (
                <Flex mt="8px" fontSize="14px" alignItems="center">
                  <Flex
                    width="24px"
                    height="24px"
                    backgroundColor="green.500"
                    borderRadius="2px"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    cursor="pointer"
                    onClick={() =>
                      setQuantity(oldState =>
                        oldState !== 1 ? oldState - 1 : 1
                      )
                    }
                  >
                    <Icon as={FiMinus} />
                  </Flex>

                  <Text mx="14px" fontSize="14px">
                    {quantity}
                  </Text>

                  <Flex
                    width="24px"
                    height="24px"
                    backgroundColor="green.500"
                    borderRadius="2px"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    cursor="pointer"
                    onClick={() => setQuantity(oldState => oldState + 1)}
                  >
                    <Icon as={FiPlus} />
                  </Flex>
                </Flex>
              )}
            </Flex>

            <Flex
              width="100%"
              mt="24px"
              fontSize={['10px', '11px', '11px', '12px']}
              textTransform="uppercase"
              whiteSpace="nowrap"
            >
              {true && (
                <>
                  {!hasOnCart(product) && (
                    <Flex
                      width="208px"
                      py="6px"
                      backgroundColor="white"
                      borderRadius="2px"
                      color="green.500"
                      fontWeight="500"
                      justifyContent="center"
                      mr="8px"
                      border="2px solid"
                      borderColor="green.500"
                      cursor="pointer"
                      onClick={() => addToCart(product, quantity)}
                    >
                      <Text>Adicionar no carrinho</Text>
                    </Flex>
                  )}

                  {hasOnCart(product) && (
                    <Flex
                      width="208px"
                      py="6px"
                      backgroundColor="red.500"
                      borderRadius="2px"
                      color="white"
                      fontWeight="500"
                      justifyContent="center"
                      mr="8px"
                      border="2px solid"
                      borderColor="red.500"
                      cursor="pointer"
                      onClick={() => removeToCart(product)}
                    >
                      <Text>Remover do Carrinho</Text>
                    </Flex>
                  )}

                  <Flex
                    width="208px"
                    py="8px"
                    backgroundColor="green.500"
                    borderRadius="2px"
                    color="white"
                    fontWeight="500"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={() =>
                      addToCart(product, quantity, {
                        redirect: true
                      })
                    }
                  >
                    <Text>Comprar Agora</Text>
                  </Flex>
                </>
              )}

              {product.is_enable === false && (
                <Flex
                  width="400px"
                  py="8px"
                  backgroundColor="gray.400"
                  color="white"
                  fontWeight="500"
                  justifyContent="center"
                  fontSize="14px"
                  textTransform="uppercase"
                >
                  <Text>Produto Indisponível no Momento</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>

        <Flex width="100%" mt="24px">
          <ComplementsList products={complements} />
        </Flex>
      </Flex>
    </>
  );
};

export default ProductDetailsPage;
