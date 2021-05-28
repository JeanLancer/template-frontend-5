import { Flex, Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// import { Container } from './styles';

const DisabledSite: React.FC = () => {
  return (
    <Flex
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.100"
      px="24px"
    >
      <Flex width="100%" flexDirection="column" alignItems="center">
        <Box mb="24px">
          <Image
            src="/images/logo.png"
            layout="fixed"
            width="104px"
            height="72px"
          />
        </Box>
        <Text fontWeight="400" fontSize="18px" textAlign="center">
          Devido a grande demanda não estamos atendendo no momento.
        </Text>

        <Link href="/acompanhar-meu-pedido">
          <Text
            color="gray.500"
            mt="64px"
            fontSize="12px"
            textTransform="uppercase"
            textDecoration="underline"
            cursor="pointer"
            _hover={{
              color: 'gray.800'
            }}
          >
            Acompanhar meu pedido
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default DisabledSite;
