import React from 'react';
import { Text, Divider, Flex } from '@chakra-ui/react';
import Input from '../../../../../shared/components/Form/Input';
import Select from '../../../../../shared/components/Form/Select';

const DeliveryAddressFields: React.FC = () => {
  return (
    <Flex width={['100%', '100%', '48%']} flexDirection="column">
      <Flex width="100%" flexDirection="column">
        <Text textTransform="uppercase" color="gray.600">
          Endereço de Entrega
        </Text>

        <Divider />
      </Flex>
      <Flex width="100%" fontSize="14px" flexDirection="column" mt="8px">
        <Flex width="100%" justifyContent="space-between">
          <Flex width="48%">
            <Select name="delivery_city" label="Cidade" size="xs" isRequired>
              <option>Cidade 1</option>
              <option>Cidade 2</option>
              <option>Cidade 3</option>
            </Select>
          </Flex>

          <Flex width="48%">
            <Select
              name="delivery_neighborhood"
              label="Bairro"
              size="xs"
              isRequired
            >
              <option>Cidade 1</option>
              <option>Cidade 2</option>
              <option>Cidade 3</option>
            </Select>
          </Flex>
        </Flex>

        <Flex width="100%" justifyContent="space-between">
          <Flex width="58%">
            <Input label="Rua" name="delivery_street" isRequired />
          </Flex>
          <Flex width="38%">
            <Input label="Número" name="delivery_number" isRequired />
          </Flex>
        </Flex>

        <Flex width="100%">
          <Input label="Complemento" name="delivery_complement" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DeliveryAddressFields;
