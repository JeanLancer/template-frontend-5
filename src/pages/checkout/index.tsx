import { Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useLayout } from '../../shared/contexts/LayoutContext';
import { useCart } from '../../shared/hooks/cart';
import EmptyCart from './components/EmptyCart';
import Cart from './components/Cart';
import DeliveryForm from './components/DeliveryForm';
import ErrorUtils from '../../shared/utils/ErrorUtils';
import ModalPaymentData from './components/ModalPaymentData';

const CheckoutPage: React.FC = () => {
  const { cartData, handleChangeCartForm } = useCart();
  const { globals } = useLayout();

  const cartFormRef = useRef<FormHandles>(null);
  const toast = useToast();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleSubmitCartFields = useCallback(
    async (data: any) => {
      try {
        if (cartFormRef.current) {
          cartFormRef.current.setErrors({});
        }

        const schema = Yup.object().shape({
          delivery_city: Yup.string().required('Cidade não informada'),
          delivery_neighborhood: Yup.string().required('Bairro não informado'),
          delivery_street: Yup.string().required('Rua não informada'),
          delivery_number: Yup.string().required('Número não informado'),
          destinatary_name: Yup.string().required(
            'Nome do destinatário não informado'
          ),
          destinatary_telephone: Yup.string().required(
            'Telefone do destinatário não informado'
          )
        });

        await schema.validate(data, {
          abortEarly: false
        });

        handleChangeCartForm('deliveryFields', {
          delivery_city: data.delivery_city,
          delivery_neighborhood: data.delivery_neighborhood,
          delivery_street: data.delivery_street,
          delivery_number: data.delivery_number,
          delivery_complement: data.delivery_complement,
          destinatary_name: data.destinatary_name,
          destinatary_telephone: data.destinatary_telephone,
          card_message: data.card_message
        });

        onOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const newErrors = ErrorUtils.getValidationErrors(err);

          if (cartFormRef.current && newErrors) {
            cartFormRef.current.setErrors(newErrors);
            cartFormRef.current.getFieldRef(Object.keys(newErrors)[0]).focus();
          }

          toast({
            title: 'Dados incompletos',
            description: 'Preencha os dados obrigatórios.',
            status: 'error',
            duration: 10000,
            isClosable: true
          });
        }
      }
    },
    [handleChangeCartForm, onOpen, toast]
  );

  return (
    <Flex
      width="100%"
      maxWidth="1200px"
      py="24px"
      px={globals.paddingX}
      justifyContent="center"
    >
      <Form
        ref={cartFormRef as any}
        onSubmit={handleSubmitCartFields}
        style={{ width: '100%', maxWidth: '900px' }}
      >
        <Flex width="100%" flexDirection="column" mt="8px">
          {cartData.itens.length > 0 && (
            <>
              <DeliveryForm />
              <Cart />
              <Flex width="100%" justifyContent="flex-end" mt="8px">
                <Flex
                  width={['100%', '100%', 'auto']}
                  backgroundColor="green.500"
                  px="24px"
                  py="4px"
                  color="white"
                  borderRadius="2px"
                  fontWeight="500"
                  cursor="pointer"
                  justifyContent="center"
                  fontSize="14px"
                  onClick={() => cartFormRef.current?.submitForm()}
                >
                  <Text>EFETUAR PAGAMENTO</Text>
                </Flex>
              </Flex>
            </>
          )}

          {cartData.itens.length <= 0 && <EmptyCart />}
        </Flex>
      </Form>

      <ModalPaymentData isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default CheckoutPage;
