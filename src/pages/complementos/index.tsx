import { Flex } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import HeaderPage from '../../shared/components/HeaderPage';
import ProductCard from '../../shared/components/ProductCard';
import { useLayout } from '../../shared/contexts/LayoutContext';
import apiGateway from '../../shared/services/apiGateway';

import WithoutProducts from '../../shared/components/WithoutProducts';

interface ComplementPageProps {
  complements: [
    {
      id: string;
      name: string;
      slug: string;
      title: string;
      meta_description: string;
    }
  ];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await apiGateway.get<any>(`/catalog/complements`);

  return { props: { complements: data as ComplementPageProps } };
};

const ComplementPage: NextPage<ComplementPageProps> = ({
  complements
}): JSX.Element => {
  const { globals } = useLayout();

  return (
    <>
      <Head key="categoria">
        <title>Complementos</title>
        <meta name="description" />
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
        <HeaderPage name="Complementos" subtitle="" />

        {complements && complements?.length > 0 && (
          <Flex width="100%" maxWidth="1200px" flexWrap="wrap" mt="24px">
            {complements.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        )}

        {(!complements || complements.length <= 0) && <WithoutProducts />}
      </Flex>
    </>
  );
};

export default ComplementPage;
