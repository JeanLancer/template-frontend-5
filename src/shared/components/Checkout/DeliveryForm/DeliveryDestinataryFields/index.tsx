import { Divider, Flex, Link, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import getConfig from 'next/config';

import Input from '../../../Form/Input';

import 'react-day-picker/lib/style.css';
import TextArea from '../../../Form/TextArea';
import { useCart } from '../../../../hooks/cart';
import Checkbox from '../../../Form/Checkbox';
import config from '../../../../config';
import { FiChevronRight } from 'react-icons/fi';
import { apiEflorista } from '../../../../services/apiGateway';
import { HTTP_RESPONSE } from '../../../../constants';

const DeliveryDestinataryFields: React.FC = () => {
  const { cartForm, handleChangeCartForm, addDiscount } = useCart();

  const [showMessage, setShowMessage] = useState(true);
  const [numCharacters, setNumCharacters] = useState(0);

  const [cupon, setCupon] = useState('');

  const { publicRuntimeConfig } = getConfig();
  const { cartData } = useCart();

  const [isValidCupon, setIsValidCupon] = useState(false);

  const handleValidCupon = useCallback(() => {
    if (!isValidCupon) {
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
  }, [addDiscount, cartData, cupon, isValidCupon]);

  useEffect(() => {
    const ifExists = !!cartData.itens.find(item =>
      item.product.name.split(/\s+/).includes('Cartão')
    );

    setShowMessage(!ifExists);
  }, [cartData]);

  return (
    <Flex
      width="100%"
      mt="16px"
      justifyContent="space-between"
      flexDirection={['column', 'column', 'row']}
    >
      <Flex width={['100%', '100%', '48%']} flexDirection="column">
        <Flex width="100%" flexDirection="column">
          <Flex>
            <Text textTransform="uppercase" color="gray.600">
              Dados do Destinatário
            </Text>
            <Text ml="4px" color="red.400" fontWeight="500">
              (Quem vai ganhar o presente)
            </Text>
          </Flex>

          <Divider />
        </Flex>
        <Flex width="100%" justifyContent="space-between" mt="8px">
          <Flex width="48%">
            <Input label="Nome" name="destinatary_name" isRequired />
          </Flex>
          <Flex width="48%">
            <Input
              label="Telefone"
              name="destinatary_telephone"
              isRequired
              mask="(99) 9999-99999"
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex width={['100%', '100%', '48%']} flexDirection="column">
        <Text fontSize="14px">
          {config.REQUIRED_CARD_MESSAGE && showMessage ? (
            <Text color={publicRuntimeConfig.ACTIVE_MENU} fontWeight={500}>
              Obs: você ainda não adicionou um cartão para enviar junto ao
              presente, caso queira adicionar um,
              <Link
                href="/categorias/cartoes"
                textDecor="underline"
                cursor="pointer"
                mx="8px"
                color="black"
              >
                clique aqui para ver as opções
              </Link>
              ou se não for adicionar um cartão, desconsidere o campo mensagem
              abaixo.
              <Text color="black" mt="6px" fontWeight="400">
                Mensagem para ser escrita no cartão
              </Text>
            </Text>
          ) : (
            <Text>Mensagem para ser escrita no cartão (Opcional)</Text>
          )}
        </Text>
        <TextArea
          name="card_message"
          onChange={e => setNumCharacters(e.currentTarget.value.length)}
        />
        <Text fontSize="10px">{`Num. Caracteres ${numCharacters}`}</Text>
        <Checkbox
          mt="8px"
          name="identify_sender"
          isChecked={cartForm.identifySender === true}
          onChange={() =>
            handleChangeCartForm('identifySender', !cartForm.identifySender)
          }
          size="sm"
          colorScheme="green"
        >
          <Text fontSize="14px">Quero ser identificado no cartão</Text>
        </Checkbox>

        <Flex width="40%" mt="32px" position="relative">
          <Flex flexDirection="column">
            <Input
              name="cupon"
              label="Utilizar Cupom"
              onChange={e => setCupon(e.currentTarget.value)}
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
      </Flex>
    </Flex>
  );
};

export default DeliveryDestinataryFields;
