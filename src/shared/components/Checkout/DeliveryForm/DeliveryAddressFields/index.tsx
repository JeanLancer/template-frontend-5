import React, { useCallback, useEffect, useState } from 'react';
import { Text, Divider, Flex, Collapse } from '@chakra-ui/react';
import Input from '../../../Form/Input';
import Select from '../../../Form/Select';
import TextArea from '../../../Form/TextArea';
import Checkbox from '../../../Form/Checkbox';
import apiGateway from '../../../../services/apiGateway';
import { HTTP_RESPONSE } from '../../../../constants';
import DeliveryNeighborhoodFields from './DeliveryNeighborhoodFields';
import { useCart } from '../../../../hooks/cart';
import config from '../../../../config';

export interface DeliveryNeighborhood {
  id: string;
  name: string;
  price: number;
}

interface DeliveryCity {
  name: string;
  price: number;
  neighborhoods: DeliveryNeighborhood[];
}

interface SetupCheckout {
  deliveryMethod: {
    type: 'CITY' | 'DISTRICT';
    name: string;
  };
  deliveryCities: DeliveryCity[];
}

const DeliveryAddressFields: React.FC = () => {
  const [showObservations, setShowObservations] = useState(false);

  const [deliverySettings, setDeliverySettings] = useState<SetupCheckout>(
    null as any
  );

  const [selectedCity, setSelectedCity] = useState<DeliveryCity>(null as any);

  const { addShippingValue } = useCart();

  const handleDeliveryCity = useCallback(
    (value: string) => {
      const city = deliverySettings.deliveryCities.find(
        item => item.name === value
      );

      if (city) {
        const citySorted = city;
        citySorted.neighborhoods = city.neighborhoods.sort((a, b) =>
          b.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/ /g, '') >
          a.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/ /g, '')
            ? -1
            : 1
        );

        setSelectedCity(citySorted);

        if (deliverySettings.deliveryMethod.type === 'CITY') {
          addShippingValue(Number(city.price));
        }
      }

      if (value === 'Demais Cidades do Brasil') {
        addShippingValue(300);
      }
    },
    [addShippingValue, deliverySettings]
  );

  useEffect(() => {
    apiGateway.get('/checkout/setup').then(response => {
      if (response.status === HTTP_RESPONSE.STATUS.SUCCESS) {
        const { deliveryMethod, deliveryCities } =
          response.data as SetupCheckout;

        setDeliverySettings({
          deliveryMethod,
          deliveryCities
        });
      }
    });
  }, []);

  return (
    <Flex width={['100%', '100%', '48%']} flexDirection="column">
      <Flex width="100%" flexDirection="column">
        <Text textTransform="uppercase" color="gray.600">
          Endere??o de Entrega
        </Text>

        <Divider />
      </Flex>
      <Flex width="100%" fontSize="14px" flexDirection="column" mt="8px">
        <Flex width="100%" justifyContent="space-between">
          <Flex width="48%">
            <Select
              name="delivery_city"
              label="Cidade"
              size="xs"
              isRequired
              onChange={e => handleDeliveryCity(e.currentTarget.value)}
            >
              <option value="">Selecione a cidade</option>
              {deliverySettings &&
                deliverySettings.deliveryCities.map(city => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}

              {config.STORE.NAME === 'MC Flores' && (
                <option
                  key="Demais Cidades do Brasil"
                  value="Demais Cidades do Brasil"
                >
                  Demais Cidades do Brasil
                </option>
              )}
            </Select>
          </Flex>

          <Flex width="48%">
            <DeliveryNeighborhoodFields
              deliveryMethodType={
                deliverySettings
                  ? deliverySettings.deliveryMethod.type
                  : 'DISTRICT'
              }
              neighborhoods={selectedCity ? selectedCity.neighborhoods : []}
            />
          </Flex>
        </Flex>

        <Flex width="100%" justifyContent="space-between">
          <Flex width="58%">
            <Input label="Rua" name="delivery_street" isRequired />
          </Flex>
          <Flex width="38%">
            <Input label="N??mero" name="delivery_number" isRequired />
          </Flex>
        </Flex>

        <Flex width="100%">
          <Input label="Complemento" name="delivery_complement" />
        </Flex>

        <Flex width="100%" flexDirection="column">
          <Checkbox
            mt="8px"
            name="identify_sender"
            size="sm"
            colorScheme="green"
            onChange={() => setShowObservations(!showObservations)}
            mb="4px"
            isChecked={showObservations === true}
          >
            <Text fontSize="16px">Acrescentar observa????o</Text>
          </Checkbox>

          <Collapse in={showObservations}>
            <TextArea name="observations" />
          </Collapse>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DeliveryAddressFields;
