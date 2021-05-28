import React from 'react';

import { Flex, Box, Text, Divider } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductCard from '../shared/components/ProductCard';
import apiGateway from '../shared/services/apiGateway';
import { useLayout } from '../shared/contexts/LayoutContext';

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await apiGateway.get('/catalog/home');

  const { banners, products } = response.data;

  return {
    props: {
      slides: banners.slides,
      highlights: products.highlights,
      others: products.others
    }
  };
};

const HomePage = ({ highlights }: any): JSX.Element => {
  const { globals } = useLayout();

  return (
    <>
      <Head key="index">
        <title>SITE TESTE</title>
        <meta name="description" content="META DESCRIPTION TESTE" />
      </Head>
      <Flex
        fontSize="32px"
        width="100%"
        justifyContent="center"
        alignItems="center"
        py="24px"
        px={globals.paddingX}
        flexDirection="column"
      >
        <Flex width="100%" mb="32px">
          <Box width="100%" backgroundColor="gray.400" height="300px" />
        </Flex>

        <Flex width="100%" maxWidth="1200px" flexDirection="column">
          <Flex width="100%" flexDirection="column" px="8px" mb="16px">
            <Text fontWeight="500" fontSize="20px" color="gray.800">
              Flores em Destaque
            </Text>
            <Divider width="100%" size="md" />
          </Flex>

          <Flex width="100%" flexWrap="wrap">
            {highlights.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        </Flex>

        {/* <Flex flexDirection="column">
          <Flex width="100%" flexDirection="column" px="8px" mb="16px">
            <Text fontWeight="500" fontSize="20px" color="gray.800">
              Demais Produtos
            </Text>
            <Divider width="100%" size="md" />
          </Flex>

          <Flex width="100%" flexWrap="wrap">
            {others.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        </Flex> */}
      </Flex>
    </>
  );
};

export default HomePage;
