import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Input from '../../../Form/Input';
import Select from '../../../Form/Select';
import { useCart } from '../../../../hooks/cart';
import NumberUtils from '../../../../utils/NumberUtils';
import apiGateway from '../../../../services/apiGateway';
import { HTTP_RESPONSE } from '../../../../constants';

interface BoxCreditCardProps {
  platform: string;
  maxNumInstallmensts?: number;
}

const BoxCreditCard: React.FC<BoxCreditCardProps> = ({ platform }) => {
  const { cartData } = useCart();

  const [textInstallments, setTextInstallments] = useState([] as string[]);

  useEffect(() => {
    apiGateway
      .get(
        `/checkout/installment_setting?platform=${platform}&total_value=${cartData.total}`
      )
      .then(response => {
        if (response.status === HTTP_RESPONSE.STATUS.SUCCESS) {
          const installmentsValue = response.data;

          const newTextInstallment: string[] = [];

          newTextInstallment.push(
            `${NumberUtils.toCurrency(cartData.total)} á vista`
          );

          Object.keys(installmentsValue).map((key, index) => {
            if (key !== 'value_1x') {
              const withOrNotFee =
                Number(installmentsValue[`value_${index + 1}x`]) <=
                cartData.total
                  ? 'sem juros'
                  : 'com juros';

              newTextInstallment.push(
                `${index + 1}x de ${NumberUtils.toCurrency(
                  installmentsValue[`value_${index + 1}x`] / (index + 1)
                )} ${withOrNotFee}`
              );
            }
            return newTextInstallment;
          });

          setTextInstallments(newTextInstallment);
        }
      });
  }, [cartData, platform]);

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
          <Input name="card_code" type="number" label="CVC" isRequired />
        </Flex>

        <Flex width="40%">
          <Select
            name="num_installments"
            label="Parcelas"
            isRequired
            size="xs"
            fontSize="11px"
          >
            {textInstallments.map((item, index) => (
              <option
                key={new Date().getUTCMilliseconds()}
                value={`${index + 1}`}
              >
                {item}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BoxCreditCard;
