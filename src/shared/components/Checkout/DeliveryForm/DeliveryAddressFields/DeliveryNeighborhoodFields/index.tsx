import React, { useCallback } from 'react';
import Input from '../../../../Form/Input';
import Select from '../../../../Form/Select';
import { useCart } from '../../../../../hooks/cart';

import { DeliveryNeighborhood } from '../index';

interface DeliveryNeighborhoodProps {
  deliveryMethodType: 'CITY' | 'DISTRICT';
  neighborhoods: DeliveryNeighborhood[];
}

const DeliveryNeighborhoodFields: React.FC<DeliveryNeighborhoodProps> = ({
  deliveryMethodType,
  neighborhoods
}) => {
  const { addShippingValue, handleChangeCartForm } = useCart();

  const handleChangeDeliveryNeighborhood = useCallback(
    e => {
      const shippingValue =
        e.target[e.target.selectedIndex].getAttribute('data-value');

      const shippingId =
        e.target[e.target.selectedIndex].getAttribute('data-id');

      handleChangeCartForm('neighborhoodId', shippingId);

      if (shippingValue) {
        addShippingValue(Number(shippingValue));
      }
    },
    [addShippingValue, handleChangeCartForm]
  );

  if (deliveryMethodType === 'CITY') {
    return <Input name="delivery_neighborhood" label="Bairro" isRequired />;
  }

  return (
    <Select
      label="Bairro"
      name="delivery_neighborhood"
      isRequired
      onChange={e => handleChangeDeliveryNeighborhood(e)}
    >
      <option value="">Selecione o bairro</option>
      {neighborhoods.map(neighborhood => (
        <option
          key={neighborhood.id}
          data-id={neighborhood.id}
          data-value={Number(neighborhood.price)}
        >
          {neighborhood.name}
        </option>
      ))}
    </Select>
  );
};

export default DeliveryNeighborhoodFields;
