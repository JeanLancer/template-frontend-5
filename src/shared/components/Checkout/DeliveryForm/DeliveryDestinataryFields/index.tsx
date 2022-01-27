import { Divider, Flex, Link, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';

import Input from '../../../Form/Input';

import 'react-day-picker/lib/style.css';
import TextArea from '../../../Form/TextArea';
import { useCart } from '../../../../hooks/cart';
import Checkbox from '../../../Form/Checkbox';
import config from '../../../../config';

const DeliveryDestinataryFields: React.FC = () => {
  const { cartForm, handleChangeCartForm } = useCart();

  const [showMessage, setShowMessage] = useState(true);

  const { publicRuntimeConfig } = getConfig();
  const { cartData } = useCart();

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
          <Text textTransform="uppercase" color="gray.600">
            Dados do Destinatário
          </Text>

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
            <Text color={publicRuntimeConfig.BACKGROUND_MENU} fontWeight={500}>
              Obs: você ainda um cartão para enviar junto ao presente,caso
              queira adicionar um
              <Link
                href="/categorias/cartoes"
                textDecor="underline"
                cursor="pointer"
                mx="8px"
                color="black"
              >
                clique aqui
              </Link>
              e veja as opções, ou se não adicionou nenhum, desconsidere o campo
              abaixo.
            </Text>
          ) : (
            <Text>Mensagem para ser impressa no cartão (Opcional)</Text>
          )}
        </Text>
        <TextArea name="card_message" />
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
      </Flex>
    </Flex>
  );
};

export default DeliveryDestinataryFields;
