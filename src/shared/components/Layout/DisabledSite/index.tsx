import { Flex, Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import getConfig from 'next/config';

const DisabledSite: React.FC = () => {
  const { publicRuntimeConfig } = getConfig();

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
            src={`/images/logo-${publicRuntimeConfig.LOGO}`}
            layout="fixed"
            width={publicRuntimeConfig.LOGO_WIDTH}
            height={publicRuntimeConfig.LOGO_HEIGHT}
          />
        </Box>
        <Text fontWeight="400" fontSize="18px" textAlign="center">
          Devido a grande demanda não estamos atendendo no momento.
        </Text>

        <Link href="/acompanhar-meu-pedido">
          <Text
            color="brand.100"
            mt="64px"
            fontSize="12px"
            fontWeight="500"
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
