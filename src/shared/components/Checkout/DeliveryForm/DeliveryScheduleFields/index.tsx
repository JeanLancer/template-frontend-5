import React, { useCallback, useState } from 'react';
import { Divider, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { BiCalendarEdit } from 'react-icons/bi';
import { FiChevronRight } from 'react-icons/fi';
import ModalDeliverySchedule from './ModalDeliverySchedule';
import { useCart } from '../../../../hooks/cart';
import DateUtils from '../../../../utils/DateUtils';
import { HTTP_RESPONSE } from '../../../../constants';
import { apiEflorista } from '../../../../services/apiGateway';
import Input from '../../../Form/Input';

const DeliveryScheduleFields: React.FC = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { cartData, cartForm, addDiscount, handleChangeCartForm } = useCart();

  const [isValidCupon, setIsValidCupon] = useState(false);

  const [cupon, setCupon] = useState('');

  const handleValidCupon = useCallback(() => {
    if (!isValidCupon) {
      handleChangeCartForm('cupon', cupon);

      apiEflorista.get(`/cupons/${cupon}`).then(response => {
        if (response.status === HTTP_RESPONSE.STATUS.SUCCESS) {
          const { data } = response;

          if (data?.id) {
            setIsValidCupon(true);

            const { type, value } = data;

            const discountValue =
              type === 'FIXO'
                ? Number(value)
                : cartData.total * (Number(value) / 100);

            addDiscount(discountValue);
          }
        }
      });
    }
  }, [addDiscount, cartData, cupon, handleChangeCartForm, isValidCupon]);

  return (
    <Flex width={['100%', '100%', '48%']} flexDirection="column">
      <Flex width="100%" flexDirection="column">
        <Text textTransform="uppercase" color="gray.600">
          Agendar Entrega
        </Text>
        <Divider />
      </Flex>

      <Flex width="100%" flexDirection="column">
        {/* <Flex
          mt="8px"
          width="100%"
          backgroundColor="yellow.100"
          border="2px solid"
          borderColor="yellow.500"
          flexDirection="column"
          fontSize="11px"
          p="8px"
          color="gray.600"
        >
          <Text textTransform="uppercase" fontWeight="500">
            Atenção
          </Text>
          <Text fontWeight="500">
            O pedido deve ser pago no mínimo 3 horas antes do turno agendado.
          </Text>
        </Flex> */}

        {cartForm.deliverySchedule.deliveryDate &&
          cartForm.deliverySchedule.deliveryHour && (
            <Flex flexDirection="column">
              <Flex
                mt="8px"
                width="100%"
                backgroundColor="green.100"
                border="2px solid"
                borderColor="green.500"
                flexDirection="column"
                fontSize="11px"
                p="8px"
                color="gray.600"
                fontWeight="500"
              >
                <Text textTransform="uppercase">Entrega agendada para:</Text>

                <Text>
                  {`${DateUtils.formatRelative(
                    cartForm.deliverySchedule.deliveryDate,
                    new Date()
                  )} - ${cartForm.deliverySchedule.deliveryHour}`}
                </Text>
              </Flex>

              <Flex
                justifyContent="flex-end"
                alignItems="center"
                cursor="pointer"
                onClick={() => onOpen()}
              >
                <Text
                  textDecoration="underline"
                  textTransform="uppercase"
                  fontSize="10px"
                  mr="8px"
                >
                  Alterar Data
                </Text>

                <Icon as={BiCalendarEdit} fontSize="12px" />
              </Flex>
            </Flex>
          )}

        {(!cartForm.deliverySchedule.deliveryDate ||
          !cartForm.deliverySchedule.deliveryHour) && (
          <Flex width="100%" mt="16px">
            <Flex
              width={['100%', '100%', 'auto']}
              backgroundColor="brand.100"
              color="white"
              px="24px"
              py="4px"
              borderRadius="2px"
              cursor="pointer"
              fontSize="14px"
              justifyContent="center"
            >
              <Text
                textTransform="uppercase"
                fontWeight="500"
                onClick={() => onOpen()}
              >
                Clique Aqui para Agendar
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>

      <Flex width="40%" position="relative" mt="32px">
        <Flex flexDirection="column">
          <Input
            name="cupon"
            label="Utilizar Cupom"
            onChange={e => {
              setCupon(String(e.currentTarget.value).trim());
            }}
          />
        </Flex>
        <Flex
          backgroundColor="green.500"
          color="white"
          alignItems="center"
          justifyContent="center"
          width="40px"
          height="33px"
          mt="auto"
          mb="3px"
          borderRadius="2px"
          onClick={() => handleValidCupon()}
          cursor="pointer"
        >
          <FiChevronRight size={24} />
        </Flex>
      </Flex>
      <Flex>
        {isValidCupon && (
          <Text color="green.500" fontWeight="500" fontSize="11px">
            CUPOM ADICIONADO
          </Text>
        )}
      </Flex>

      <ModalDeliverySchedule isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default DeliveryScheduleFields;
