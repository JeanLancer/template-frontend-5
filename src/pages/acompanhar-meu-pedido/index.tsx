import { Flex, Input, Text } from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';
import { HTTP_RESPONSE } from '../../shared/constants';
import { useLayout } from '../../shared/contexts/LayoutContext';
import { apiEflorista } from '../../shared/services/apiGateway';
import OrderDetails from './components/OrderDetails';

const TrackOrderPage: React.FC = () => {
  const { globals } = useLayout();

  const codeRef = useRef<any>(null);
  const emailRef = useRef<any>(null);

  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(() => {
    const code = codeRef.current.value;
    const email = emailRef.current.value;

    setError(false);

    try {
      apiEflorista
        .get(`/orders/details/${String(code).padStart(6, '0')}`)
        .then(response => {
          if (response.status === HTTP_RESPONSE.STATUS.SUCCESS) {
            console.log(response.data);

            if (response.data) {
              const email1 = String(response.data.buyer.email)
                .toLowerCase()
                .trim();
              const email2 = String(email).toLowerCase().trim();

              if (email1 === email2) {
                setOrder(response.data);
              } else {
                setError(true);
              }
            } else {
              setError(true);
            }
          } else {
            setError(true);
          }
        });

      codeRef.current.value = '';
      emailRef.current.value = '';
    } catch (e) {
      setError(true);

      codeRef.current.value = '';
      emailRef.current.value = '';
    }
  }, []);

  return (
    <Flex
      width="100%"
      maxWidth="1200px"
      height="100%"
      px={globals.paddingX}
      justifyContent="center"
      alignItems="center"
    >
      {!order && (
        <Flex width="100%" maxWidth="600px" flexDirection="column" mt="56px">
          <Text fontSize="16px" mb="8px" color="gray.600">
            Para acompanhar seu pedido informe os dados abaixo:
          </Text>

          {error && (
            <Flex
              width="100%"
              border="2px solid"
              borderColor="red.500"
              backgroundColor="red.100"
              mb="16px"
            >
              <Flex p="8px">
                <Text fontSize="14px" color="red.500" fontWeight="500">
                  Pedido não encontrado, verifique se o email é o mesmo
                  utilizado na hora da compra.
                </Text>
              </Flex>
            </Flex>
          )}

          <Flex
            width="100%"
            flexDirection={['column', 'column', 'row']}
            justifyContent="space-between"
          >
            <Input
              ref={codeRef}
              width={['100%', '100%', '48%']}
              size="sm"
              placeholder="Número do Pedido"
              focusBorderColor="none"
              mb="8px"
            />

            <Input
              ref={emailRef}
              width={['100%', '100%', '48%']}
              size="sm"
              placeholder="E-mail"
              focusBorderColor="none"
            />
          </Flex>

          <Flex
            mt="16px"
            width="100%"
            backgroundColor="green.500"
            color="white"
            py="4px"
            fontSize="18px"
            justifyContent="center"
            borderRadius="2px"
            cursor="pointer"
            onClick={() => handleSubmit()}
          >
            <Text textTransform="uppercase">Confirmar</Text>
          </Flex>
        </Flex>
      )}

      {order && <OrderDetails order={order} />}
    </Flex>
  );
};

export default TrackOrderPage;
