import { Divider, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import Input from '../../../Form/Input';

import 'react-day-picker/lib/style.css';
import TextArea from '../../../Form/TextArea';
import { useCart } from '../../../../hooks/cart';
import Checkbox from '../../../Form/Checkbox';
import config from '../../../../config';

const DeliveryDestinataryFields: React.FC = () => {
  const { cartForm, handleChangeCartForm } = useCart();

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
          {config.REQUIRED_CARD_MESSAGE ? (
            <Text>
              Mensagem para ser escrita no cartão. Obs: É necessário incluir um
              dos modelos de cartão no carrinho para que esse campo seja válido.
              <Link
                href="/categorias/cartoes"
                textDecor="underline"
                cursor="pointer"
                ml="8px"
              >
                Clique aqui para escolher um cartão
              </Link>
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
