import { Flex } from '@chakra-ui/react';
import { GetServerSideProps, GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import HeaderPage from '../../shared/components/HeaderPage';
import ProductCard from '../../shared/components/ProductCard';
import { useLayout } from '../../shared/contexts/LayoutContext';
import apiGateway from '../../shared/services/apiGateway';

import config from '../../shared/config/index';

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetStaticPropsContext
) => {
  const { query } = ctx.params as { query: string };

  const { data } = await apiGateway.get<any>(`/catalog/products/search`, {
    params: {
      query
    }
  });

  return { props: { products: data as any[], query } };
};

const SearchPage: NextPage<any> = ({ products, query }): JSX.Element => {
  const { globals } = useLayout();

  return (
    <>
      <Head key="categoria">
        <title>{`${query} - ${config.SEO.TITLE}`}</title>
        <meta
          name="description"
          content={`${query} - ${config.SEO.META_DESCRIPTION}`}
        />
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
        <HeaderPage name={query} subtitle="Pesquisando por" />

        {products && (
          <Flex width="100%" maxWidth="1200px" flexWrap="wrap" mt="24px">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default SearchPage;
