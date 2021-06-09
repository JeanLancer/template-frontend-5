import React from 'react';
import { Flex } from '@chakra-ui/react';

import DeliveryAddressFields from './DeliveryAddressFields';
import DeliveryDestinataryFields from './DeliveryDestinataryFields';
import DeliveryScheduleFields from './DeliveryScheduleFields';

const DeliveryForm: React.FC = () => {
  return (
    <Flex width="100%" mb="24px" flexDirection="column">
      <Flex
        width="100%"
        justifyContent="space-between"
        flexDirection={['column', 'column', 'row']}
      >
        <DeliveryAddressFields />

        <DeliveryScheduleFields />
      </Flex>

      <DeliveryDestinataryFields />
    </Flex>
  );
};

export default DeliveryForm;
