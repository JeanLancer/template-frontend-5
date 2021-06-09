import React, { useCallback, useState } from 'react';
import { Flex, Icon, Text, Image, useDisclosure } from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import { useCart } from '../../../hooks/cart';
import NumberUtils from '../../../utils/NumberUtils';
import ModalRemoveProduct from './ModalRemoveProduct';

const Cart: React.FC = () => {
  const { cartData } = useCart();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [productToRemove, setProductToRemove] = useState<any>(null);

  const handleRemoveToCart = useCallback(
    (product: any) => {
      setProductToRemove(product);
      onOpen();
    },
    [onOpen]
  );

  return (
    <Flex width="100%" flexDirection="column">
      <Text
        textTransform="uppercase"
        backgroundColor="gray.400"
        px="8px"
        py="4px"
        color="white"
        fontSize={['12px', '14px']}
      >
        Meu Carrinho
      </Text>

      {cartData.itens.map(item => (
        <Flex
          width="100%"
          key={item.product.id}
          alignItems="center"
          backgroundColor="gray.100"
          p="8px"
          position="relative"
        >
          <Image
            src={item.product.url_thumb}
            alt={item.product.name}
            width={['40px', '48px', '56px', '64px']}
            height={['40px', '48px', '56px', '64px']}
          />

          <Flex flexDirection="column" ml={['8px', '16px']}>
            <Text fontSize={['10px', '12px', '14px']}>{item.product.name}</Text>

            <Text
              display={['none', 'block']}
              fontSize="10px"
              whiteSpace="pre-wrap"
              color="gray.600"
              maxWidth="296px"
            >
              {item.product.description}
            </Text>
          </Flex>

          <Flex
            mr="8px"
            ml="auto"
            flexDirection={['column', 'column', 'row']}
            textAlign="right"
          >
            <Flex
              width="64px"
              flexDirection={['row', 'row', 'column']}
              mr={['0px', '0px', '24px']}
              fontSize={['10px', '12px']}
              textAlign="center"
              justifyContent="flex-end"
            >
              <Text mr={['8px']}>Qtd.</Text>
              <Text whiteSpace="pre-wrap" color="gray.600">
                {item.quantity}
              </Text>
            </Flex>

            <Flex
              width="64px"
              flexDirection="column"
              fontSize={['10px', '12px']}
            >
              <Text>Subtotal</Text>
              <Text whiteSpace="pre-wrap" color="gray.600">
                {NumberUtils.toCurrency(item.subtotal)}
              </Text>
            </Flex>
          </Flex>

          <Flex
            backgroundColor="red.500"
            color="white"
            p="2px"
            borderRadius="2px"
            position="absolute"
            right="-8px"
            fontSize="12px"
            boxShadow="0 1px 3px rgba(0,0,0,0.12)"
            onClick={() => handleRemoveToCart(item.product)}
            title="Remover Produto do Carrinho"
            cursor="pointer"
          >
            <Icon as={BiTrash} />
          </Flex>
        </Flex>
      ))}

      <Flex
        backgroundColor="gray.200"
        px="8px"
        py="4px"
        color="gray.600"
        fontSize={['12px', '14px']}
        alignItems="center"
        flexDirection={['column', 'column', 'row']}
      >
        {/* <Flex
          width={['100%', '100%', '50%']}
          mb={['8px', '8px', '0px']}
          flexDirection="column"
        >
          <Text>Cupom de Desconto</Text>
          <Input
            width={['100%', '100%', '200px']}
            size="xs"
            backgroundColor="gray.100"
            focusBorderColor="none"
            borderColor="gray.300"
            placeholder="MEU CUPOM"
            color="gray.500"
          />
        </Flex> */}
        <Flex
          width={['100%', '100%', '50%']}
          ml={['0px', '0px', 'auto']}
          flexDirection="column"
          alignItems="flex-end"
          fontSize={['12px']}
        >
          <Flex>
            <Text mr="8px">Total em Produtos</Text>
            <Text width="64px" textAlign="right">
              {NumberUtils.toCurrency(cartData.totalProducts)}
            </Text>
          </Flex>
          <Flex>
            <Text mr="8px">Valor de Entrega</Text>
            <Text width="64px" textAlign="right">
              {NumberUtils.toCurrency(cartData.shippingValue)}
            </Text>
          </Flex>
          <Flex>
            <Text mr="8px">Valor de Desconto</Text>
            <Text width="64px" textAlign="right">
              {NumberUtils.toCurrency(cartData.discountsValue)}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        backgroundColor="gray.100"
        px="8px"
        py="2px"
        color="gray.600"
        fontSize="14px"
        justifyContent="flex-end"
        fontWeight="500"
      >
        <Text mr="16px">Total a Pagar</Text>
        <Text>{NumberUtils.toCurrency(cartData.total)}</Text>
      </Flex>

      {productToRemove && (
        <ModalRemoveProduct
          productToRemove={productToRemove}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Flex>
  );
};

export default Cart;
