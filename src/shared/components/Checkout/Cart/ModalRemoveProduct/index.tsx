import React from 'react';

import {
  Flex,
  Text,
  Image,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react';
import { useCart } from '../../../../hooks/cart';

interface ModalRemoveProductProps {
  isOpen: boolean;
  onClose: () => void;
  productToRemove: any;
}

const ModalRemoveProduct: React.FC<ModalRemoveProductProps> = ({
  isOpen,
  onClose,
  productToRemove
}) => {
  const { removeToCart } = useCart();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb="8px" borderRadius="2px" mx="8px">
        <ModalHeader fontWeight="500">
          <Text fontSize="14px">Desejar remover este produto do carrinho?</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex width="100%" flexDirection="column">
            <Flex width="100%" alignItems="center">
              <Image
                src={productToRemove.url_thumb}
                width={['40px', '48px', '64px']}
                mr="16px"
              />
              <Text fontSize={['12px', '12px', '14px']}>
                {productToRemove.name}
              </Text>
            </Flex>

            <Flex
              mt="16px"
              width="100%"
              justifyContent="flex-end"
              fontSize="12px"
              alignItems="center"
              textTransform="uppercase"
            >
              <Flex
                mr="8px"
                px="16px"
                py="4px"
                backgroundColor="gray.400"
                borderRadius="2px"
                cursor="pointer"
                onClick={() => {
                  onClose();
                }}
              >
                <Text color="white">Cancelar</Text>
              </Flex>

              <Flex
                px="16px"
                py="4px"
                backgroundColor="brand.100"
                borderRadius="2px"
                cursor="pointer"
                onClick={() => {
                  removeToCart(productToRemove);
                  onClose();
                }}
              >
                <Text color="white">Confirmar</Text>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalRemoveProduct;
