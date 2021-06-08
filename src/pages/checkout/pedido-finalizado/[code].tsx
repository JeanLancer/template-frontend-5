import React, { useEffect, useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import imgObrigado from '../../../assets/images/tela-obrigado.png';
import config from '../../../shared/config/index';
import { useLayout } from '../../../shared/contexts/LayoutContext';
import { apiEflorista } from '../../../shared/services/apiGateway';
import { HTTP_RESPONSE } from '../../../shared/constants';

interface CheckoutLastPageProps {
  code: string;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  return { props: { code: ctx.params?.code } };
};

const CheckoutLastPage: NextPage<CheckoutLastPageProps> = ({ code }) => {
  const { globals } = useLayout();

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    apiEflorista.get(`/orders/details/${code}`).then(response => {
      if (response.status === HTTP_RESPONSE.STATUS.SUCCESS) {
        setOrder(response.data);
      }
    });
  }, [code]);

  return (
    order && (
      <Flex width="100%" justifyContent="center">
        <Head key="checkout-last-page">
          <title>{`Pedido Efetuado - ${config.SEO.TITLE}`}</title>

          {config.GOOGLE.TAG.ID && config.GOOGLE.TAG.SEND_TO && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  gtag('event', 'conversion', {
                    'send_to': '${config.GOOGLE.TAG.ID}/${
                    config.GOOGLE.TAG.SEND_TO
                  }',
                    'value': ${Number(order.total_value) || 100},
                    'currency': 'BRL',
                    'transaction_id': '${order.code}'
                  });
                `
                }}
              />
            </>
          )}
        </Head>
        <Flex
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          fontWeight="500"
          fontSize="24px"
          flexDirection="column"
          py="42px"
          maxWidth="1200px"
          px={globals.paddinX}
        >
          <Image src={imgObrigado} alt="Obrigado pela compra" />
          <Text as="h1" color="black" fontSize="24px">
            Pedido Finalizado.
          </Text>
          <Text fontSize="16px">Seu pedido foi efetuado com sucesso.</Text>

          <Flex fontSize={['16px', '16px']}>
            <Text mr="8px">Número do seu Pedido:</Text>
            <Text color="green.500">{code}</Text>
          </Flex>

          <Flex fontSize="14px" textAlign="center" mt="24px">
            <Box
              mt="8px"
              backgroundColor="green.500"
              height="40px"
              display="flex"
              color="white"
              fontWeight="600"
              px="16px"
              borderRadius="4px"
              whiteSpace="pre"
              alignItems="center"
              justifyContent="center"
              onClick={() => {
                window.location.href = '/acompanhar-meu-pedido';
              }}
              cursor="pointer"
            >
              <Text fontSize="16px">ACOMPANHAR SEU PEDIDO</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

export default CheckoutLastPage;
