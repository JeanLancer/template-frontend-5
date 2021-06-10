import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

import whats from '../../../assets/images/whats.png';
import { useData } from '../../hooks/data';

const WhatsButton: React.FC = () => {
  const data = useData();

  return (
    <Flex
      position="fixed"
      zIndex={10000000}
      bottom="0"
      right="0"
      marginBottom="290px"
      marginRight="24px"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://wa.me/55${data.general_settings?.whatsapp?.replace(
          /\D/g,
          ''
        )}`}
      >
        <img width="40px" src={whats} alt="Nosso whatsapp" />

        <Flex
          mt="2px"
          backgroundColor="brand.100"
          borderRadius="12px"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="10px" color="white" fontWeight="500">
            Chamar
          </Text>
        </Flex>
      </a>
    </Flex>
  );
};

export default WhatsButton;
