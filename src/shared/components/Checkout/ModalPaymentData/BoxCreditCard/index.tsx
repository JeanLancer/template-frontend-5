import { Flex } from '@chakra-ui/react';
import React from 'react';
import Input from '../../../Form/Input';
import Select from '../../../Form/Select';
import { useCart } from '../../../../hooks/cart';
import NumberUtils from '../../../../utils/NumberUtils';

interface BoxCreditCardProps {
  maxNumInstallmensts?: number;
}

const BoxCreditCard: React.FC<BoxCreditCardProps> = ({
  maxNumInstallmensts = 6
}) => {
  const { cartData } = useCart();

  return (
    <Flex width="100%" flexDirection="column" mt="8px">
      <Flex width="100%" justifyContent="space-between">
        <Flex width="48%">
          <Input name="card_name" label="Nome no Cartão" isRequired />
        </Flex>
        <Flex width="48%">
          <Input
            name="card_number"
            label="Número do Cartão"
            isRequired
            mask="9999.9999.9999.9999"
          />
        </Flex>
      </Flex>

      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Flex width="25%">
          <Input
            name="card_expiration"
            label="Validade"
            isRequired
            mask="99/99"
            placeholder="mm/yy"
          />
        </Flex>

        <Flex width="25%">
          <Input
            name="card_code"
            type="number"
            label="Cód. Segurança"
            isRequired
          />
        </Flex>

        <Flex width="40%">
          <Select
            name="num_installments"
            label="Parcelas"
            isRequired
            size="xs"
            fontSize="11px"
          >
            {Array.from({ length: maxNumInstallmensts }, (_item, index) => (
              <option value={index + 1}>
                {`${index + 1}x de ${NumberUtils.toCurrency(
                  cartData.total / (index + 1)
                )}`}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BoxCreditCard;
