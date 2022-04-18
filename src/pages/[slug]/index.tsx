import React, { useCallback, useEffect, useState } from 'react';
import { Box, Text, Flex, Heading, Icon } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from 'react-icons/ai';
import Head from 'next/head';
import { BiChevronRight } from 'react-icons/bi';
import apiGateway from '../../shared/services/apiGateway';
import NumberUtils from '../../shared/utils/NumberUtils';
import { useLayout } from '../../shared/contexts/LayoutContext';
import { useCart } from '../../shared/hooks/cart';
import config from '../../shared/config/index';
import ComplementsList from '../../shared/components/ComplementsList';
import { HTTP_RESPONSE } from '../../shared/constants';

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

  const [deliveryMessage, setDeliveryMessage] = useState('');

  const [sizeSelected, setSizeSelected] = useState(() => {
    if (product?.variants?.sizes.length > 0) {
      return product?.variants?.sizes[0];
    }

    return null;
  });
  const [colorSelected, setColorSelected] = useState(() => {
    if (product?.variants?.colors.length > 0) {
      return product?.variants?.colors[0];
    }

    return null;
  });

  const [variantPrice, setVariantPrice] = useState(0);

  const handleChangeVariant = useCallback(() => {
    let newVariantPrice = 0;

    if (sizeSelected) {
      if (sizeSelected.price_type === 'sub') {
        newVariantPrice -= Number(sizeSelected.price);
      } else {
        newVariantPrice += Number(sizeSelected.price);
      }
    }

    if (colorSelected) {
      if (colorSelected.price_type === 'sub') {
        newVariantPrice -= Number(colorSelected.price);
      } else {
        newVariantPrice += Number(colorSelected.price);
      }
    }

    console.log(newVariantPrice);

    setVariantPrice(newVariantPrice);
  }, [colorSelected, sizeSelected]);

  const goToDescription = useCallback(() => {
    const divRef: any = document.getElementById('description');

    if (divRef) {
      window.scrollTo({
        top: divRef.getBoundingClientRect().top,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    console.log(colorSelected);
    setSelectedImage(
      colorSelected?.image_url ? colorSelected?.image_url : product.url_web
    );
    handleChangeVariant();

    apiGateway.get('/checkout/schedule_setting').then(response => {
      if (response.status === HTTP_RESPONSE.STATUS.SUCCESS) {
        const { delivery_message } = response.data;

        setDeliveryMessage(delivery_message);
      }
    });
  }, [colorSelected, handleChangeVariant, product]);

  return (
    <>
      <Head key="product">
        <title>{`${product?.name} - ${config.STORE.NAME}`}</title>
        <meta
          name="description"
          content={`${product.meta_description} - ${config.STORE.NAME}`}
        />

        <meta
          name="keywords"
          content={`${String(
            product.tags.map((item: any) => ` ${item.value}`)
          ).trim()}`}
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
              <Box width="100%" maxWidth="80%" position="relative">
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
            border="2px solid"
            borderColor="gray.200"
            py="24px"
          >
            <Heading
              as="h1"
              fontWeight="500"
              fontSize={['20px', '20px', '16px']}
              color="brand.300"
            >
              {product.name}
            </Heading>

            <Text
              whiteSpace="pre-wrap"
              fontSize="14px"
              lineHeight="18px"
              mt="8px"
              color="brand.300"
            >
              {`Código: ${product.code_sku}`}
            </Text>

            <Text
              whiteSpace="pre-wrap"
              fontSize="14px"
              lineHeight="18px"
              mt="48px"
              color="brand.300"
            >
              {`${String(product.description || '').substring(0, 144)}...`}
            </Text>

            <Flex
              mt="16px"
              justifyContent="flex-end"
              borderBottom="2px solid"
              borderColor="gray.200"
              alignItems="center"
              fontWeight="500"
              color="brand.100"
            >
              <Text
                whiteSpace="pre-wrap"
                fontSize="14px"
                lineHeight="18px"
                cursor="pointer"
                onClick={() => goToDescription()}
              >
                ver descrição completa
              </Text>

              <Icon as={BiChevronRight} />
            </Flex>

            {product.variants.sizes.length > 0 && (
              <Flex width="100%" flexDirection="column" mt="8px" py="8px">
                <Text fontWeight="500" mb="8px">
                  Tamanhos Disponíveis
                </Text>

                <Flex>
                  {product.variants.sizes.map((size: any) => (
                    <Flex
                      width="80px"
                      height="40px"
                      justifyContent="center"
                      alignItems="center"
                      border={
                        sizeSelected?.name === size.name
                          ? '4px solid'
                          : '2px solid'
                      }
                      borderColor={
                        sizeSelected?.name === size.name
                          ? 'red.500'
                          : 'gray.500'
                      }
                      mr="24px"
                      _last={{
                        mr: '0px'
                      }}
                      cursor="pointer"
                      onClick={() => {
                        setSizeSelected(size);
                        handleChangeVariant();
                      }}
                    >
                      <Text fontSize="12px" fontWeight="500">
                        {size.name}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            )}

            {product.variants.colors.length > 0 && (
              <Flex width="100%" flexDirection="column" mt="8px" py="8px">
                <Text fontWeight="500" mb="8px">
                  Cores Disponíveis
                </Text>

                <Flex>
                  {product.variants.colors.map((color: any) => (
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      mr="40px"
                      _last={{
                        mr: '0px'
                      }}
                      cursor="pointer"
                      onClick={() => {
                        setColorSelected(color);
                        handleChangeVariant();
                      }}
                    >
                      <Flex
                        width="40px"
                        height="40px"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="50%"
                        border={
                          colorSelected?.name === color.name
                            ? '4px solid'
                            : '2px solid'
                        }
                        borderColor={
                          colorSelected?.name === color.name
                            ? 'red.500'
                            : 'gray.500'
                        }
                      />

                      <Text fontSize="12px" fontWeight="500">
                        {color.name}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            )}

            {product?.height && product?.width && (
              <Flex width="100%" alignItems="center" my="24px">
                <Text fontWeight="500" mr="16px">
                  Medidas
                </Text>

                <Flex flexDirection="column" alignItems="center" mr="24px">
                  <Icon as={AiOutlineColumnHeight} fontSize="32px" />
                  <Text fontSize="12px">{`${product?.height}cm`}</Text>
                </Flex>

                <Flex flexDirection="column" alignItems="center">
                  <Icon as={AiOutlineColumnWidth} fontSize="32px" />
                  <Text fontSize="12px">{`${product?.width}cm`}</Text>
                </Flex>
              </Flex>
            )}

            {deliveryMessage && (
              <Flex
                border="2px solid"
                borderColor="gray.200"
                backgroundColor="gray.100"
                fontSize="14px"
                px="8px"
                py="4px"
              >
                <Text flexWrap="nowrap">
                  <Text fontWeight="500">Sobre a Entrega:</Text>
                  {deliveryMessage}
                </Text>
              </Flex>
            )}

            <Flex width="100%" mt="48px" flexDirection="column">
              <Flex>
                {!product.is_promotional && (
                  <Flex alignItems="center">
                    <Text color="brand.800" fontSize="18px" mr="8px">
                      {NumberUtils.toCurrency(
                        (Number(product.price_sale) + Number(variantPrice)) *
                          quantity
                      )}
                    </Text>

                    {config.KEY !== '3e4ab6bd-ba02-4d50-8b0b-beaf9f289eb3' && (
                      <Text fontSize="12px" fontWeight="400">
                        {`Em até ${
                          config.STORE.NAME === 'Cassia Flores' ? '2x' : '3x'
                        } sem juros`}
                      </Text>
                    )}
                  </Flex>
                )}

                {product.is_promotional && (
                  <Flex flexDirection="column" fontWeight="500">
                    <Text
                      textDecoration="line-through"
                      color="gray.800"
                      fontSize="16px"
                    >
                      {`De ${NumberUtils.toCurrency(
                        (product.price_sale + variantPrice) * quantity
                      )}`}
                    </Text>
                    <Flex alignItems="center">
                      <Text color="gray.800" fontSize="18px" mr="8px">
                        {`Por Apenas ${NumberUtils.toCurrency(
                          (product.price_promotional + variantPrice) * quantity
                        )}`}
                      </Text>

                      <Text fontSize="12px" fontWeight="400">
                        {`Em até ${
                          config.STORE.NAME === 'Cassia Flores' ? '2x' : '3x'
                        } sem juros`}
                      </Text>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </Flex>

            <Flex
              width="100%"
              mt="24px"
              fontSize={['10px', '11px', '11px', '12px']}
              textTransform="uppercase"
            >
              <Flex fontSize="14px" alignItems="center" mr="16px">
                <Flex
                  width="32px"
                  height="32px"
                  backgroundColor="green.500"
                  borderRadius="2px"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  cursor="pointer"
                  onClick={() =>
                    setQuantity(oldState => (oldState !== 1 ? oldState - 1 : 1))
                  }
                >
                  <Icon as={FiMinus} />
                </Flex>

                <Text mx="16px" fontSize="24px">
                  {quantity}
                </Text>

                <Flex
                  width="32px"
                  height="32px"
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

              {!hasOnCart(product) && (
                <Flex
                  width="208px"
                  py="6px"
                  px="4px"
                  backgroundColor="white"
                  borderRadius="2px"
                  color="brand.100"
                  fontWeight="500"
                  justifyContent="center"
                  mr="8px"
                  border="2px solid"
                  borderColor="brand.100"
                  cursor="pointer"
                  onClick={() => addToCart(product, quantity)}
                  alignItems="center"
                >
                  <Text>Adicionar no carrinho</Text>
                </Flex>
              )}

              {hasOnCart(product) && (
                <Flex
                  width="208px"
                  py="6px"
                  px="4px"
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
                  alignItems="center"
                >
                  <Text>Remover do Carrinho</Text>
                </Flex>
              )}

              <Flex
                width="208px"
                py="8px"
                px="4px"
                backgroundColor="brand.100"
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
                alignItems="center"
              >
                <Text>Comprar Agora</Text>
              </Flex>

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

        <Flex id="description" width="100%" mt="24px" mb="24px">
          <Text
            whiteSpace="pre-wrap"
            fontSize="16px"
            lineHeight="18px"
            mt="48px"
            color="brand.300"
          >
            {product.description}
          </Text>
        </Flex>

        <Flex width="100%" mt="24px">
          <ComplementsList products={complements} />
        </Flex>
      </Flex>
    </>
  );
};

export default ProductDetailsPage;
