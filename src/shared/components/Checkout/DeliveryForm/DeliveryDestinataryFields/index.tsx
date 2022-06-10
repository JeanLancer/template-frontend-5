import 'react-day-picker/lib/style.css';

import { Divider, Flex, Link, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';

import Input from '../../../Form/Input';

import TextArea from '../../../Form/TextArea';
import { useCart } from '../../../../hooks/cart';
import Checkbox from '../../../Form/Checkbox';
import config from '../../../../config';

const DeliveryDestinataryFields: React.FC = () => {
  const { cartForm, handleChangeCartForm } = useCart();

  const [showMessage, setShowMessage] = useState(true);
  const [numCharacters, setNumCharacters] = useState(0);

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
      </Flex>
    </Flex>
  );
};

export default DeliveryDestinataryFields;
