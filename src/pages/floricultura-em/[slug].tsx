import React from 'react';

import { Flex, Text, Divider } from '@chakra-ui/react';
import { GetServerSideProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';

import apiGateway, { apiEflorista } from '../../shared/services/apiGateway';
import ProductCard from '../../shared/components/ProductCard';
import { useLayout } from '../../shared/contexts/LayoutContext';

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetStaticPropsContext
) => {
  const { slug } = ctx.params as { slug: string };

  const { data } = await apiEflorista.get('/cities');
  const response = await apiGateway.get('/catalog/home');

  const city = data.find((item: any) => item.slug === slug);

  return {
    props: {
      city,
      highlights: response.data.products.highlights,
      others: response.data.products.others
    }
  };
};

const HomePage = ({ city, highlights, others }: any): JSX.Element => {
  const { globals } = useLayout();

  return (
    city && (
      <>
        <Head key="index">
          <title>{`Floricultura em ${city?.name}`}</title>
          <meta name="description" content={city?.meta_description} />
          <meta name="keywords" content={city?.keywords} />
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
          <Flex width="100%" maxWidth="1200px" flexDirection="column">
            <Flex width="100%" flexDirection="column" px="8px" mb="16px">
              <Text fontWeight="500" fontSize="22px" color="brand.300">
                PRODUTOS EM DESTAQUE
              </Text>
              <Divider width="100%" size="md" />
            </Flex>

            <Flex width="100%" flexWrap="wrap">
              {highlights.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Flex>
          </Flex>

          <Flex width="100%" maxWidth="1200px" flexDirection="column">
            <Flex
              width="100%"
              flexDirection="column"
              px="8px"
              mb="16px"
              justifyContent="center"
            >
              <Text fontWeight="500" fontSize="20px" color="brand.300">
                TODOS OS PRODUTOS
              </Text>
              <Divider width="100%" size="md" />
            </Flex>

            <Flex width="100%" flexWrap="wrap">
              {others.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </>
    )
  );
};

export default HomePage;
