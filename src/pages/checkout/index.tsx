import { Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Head from 'next/head';
import { useLayout } from '../../shared/contexts/LayoutContext';
import { useCart } from '../../shared/hooks/cart';
import Cart from '../../shared/components/Checkout/Cart';
import ErrorUtils from '../../shared/utils/ErrorUtils';
import config from '../../shared/config/index';
import { useData } from '../../shared/hooks/data';
import MinimumValueCart from '../../shared/components/Checkout/MinimunValueCart';
import DeliveryForm from '../../shared/components/Checkout/DeliveryForm';
import EmptyCart from '../../shared/components/Checkout/EmptyCart';
import ModalPaymentData from '../../shared/components/Checkout/ModalPaymentData';

const CheckoutPage: React.FC = () => {
  const { cartForm, cartData, handleChangeCartForm } = useCart();
  const { globals } = useLayout();

  const cartFormRef = useRef<FormHandles>(null);
  const toast = useToast();
  const dataConfig = useData();

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

        if (
          cartForm.deliverySchedule.deliveryDate &&
          cartForm.deliverySchedule.deliveryHour
        ) {
          handleChangeCartForm('deliveryFields', {
            delivery_city: data.delivery_city,
            delivery_neighborhood: data.delivery_neighborhood,
            delivery_street: data.delivery_street,
            delivery_number: data.delivery_number,
            delivery_complement: data.delivery_complement,
            observations: data.observations,
            destinatary_name: data.destinatary_name,
            destinatary_telephone: data.destinatary_telephone,
            card_message: data.card_message
          });

          onOpen();
        } else {
          toast({
            title: 'Dados incompletos',
            description: 'Agende o horario da sua entrega.',
            status: 'error',
            duration: 10000,
            isClosable: true
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const newErrors = ErrorUtils.getValidationErrors(err);

          console.log(newErrors);

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
    [cartForm, handleChangeCartForm, onOpen, toast]
  );

  return (
    <>
      <Head>
        {config.PAYMENT.PLATFORM === 'Mercado Pago' && (
          <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js" />
        )}

        {config.PAYMENT.PLATFORM === 'Iugu' && (
          <script type="text/javascript" src="https://js.iugu.com/v2" />
        )}
      </Head>
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
          style={{ width: '100%', maxWidth: '1200px' }}
        >
          <Flex width="100%" flexDirection="column" mt="8px">
            {cartData.itens.length > 0 && (
              <>
                {cartData.totalProducts <
                  dataConfig.general_settings?.min_order_value && (
                  <MinimumValueCart
                    value={dataConfig.general_settings.min_order_value}
                  />
                )}
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
    </>
  );
};

export default CheckoutPage;
