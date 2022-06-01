import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';

import whats from '../../../assets/images/whats.png';
import config from '../../config';
import { useData } from '../../hooks/data';

const WhatsButton: React.FC = () => {
  const data = useData();

  const handleClick = useCallback(() => {
    try {
      (window as any).gtag('event', 'conversion', {
        send_to: `${config.GOOGLE.TAG.ID}/${config.GOOGLE.TAG.SEND_TO_WHATS}`,
        value: 1.0,
        currency: 'BRL',
        transaction_id: ''
      });
    } catch (e) {
      console.log(e);
    }

    window.open(
      `https://wa.me/55${data.general_settings?.whatsapp?.replace(/\D/g, '')}`,
      '_blank'
    );
  }, [data.general_settings]);

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
      <Box
        cursor="pointer"
        onClick={() => {
          handleClick();
          return `return gtag_report_conversion('https://wa.me/55${data.general_settings?.whatsapp?.replace(
            /\D/g,
            ''
          )}');`;
        }}
      >
        <img width="40px" src={whats} alt="Nosso whatsapp" />

        <Flex
          mt="2px"
          backgroundColor="red.500"
          borderRadius="12px"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="10px" color="white" fontWeight="500">
            Chamar
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default WhatsButton;
