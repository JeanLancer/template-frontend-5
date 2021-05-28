import { Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Input from '../../../../../shared/components/Form/Input';

import 'react-day-picker/lib/style.css';
import TextArea from '../../../../../shared/components/Form/TextArea';

const DeliveryDestinataryFields: React.FC = () => {
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
        <Text fontSize="12px">
          Mensagem para ser impressa no cartão (Opcional)
        </Text>
        <TextArea name="card_message" />
      </Flex>
    </Flex>
  );
};

export default DeliveryDestinataryFields;
