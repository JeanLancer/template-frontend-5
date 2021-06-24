import { Flex } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import HeaderPage from '../../shared/components/HeaderPage';
import ProductCard from '../../shared/components/ProductCard';
import { useLayout } from '../../shared/contexts/LayoutContext';
import apiGateway from '../../shared/services/apiGateway';

import config from '../../shared/config/index';
import WithoutProducts from '../../shared/components/WithoutProducts';

type Product = {
  id: string;
  name: string;
  slug: string;
  is_highlight: boolean;
  is_promotional: boolean;
  price_sale: number;
  price_promotional: number;

  url_thumb: string;
};

interface CategoryPageProps {
  category: {
    id: string;
    name: string;
    slug: string;
    title: string;
    meta_description: string;

    products: Product[];
  };
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { slug } = ctx.params as { slug: string };

  const { data } = await apiGateway.get<any>(`/catalog/categories/${slug}`);

  return { props: { category: data as CategoryPageProps } };
};

const CategoryPage: NextPage<CategoryPageProps> = ({
  category
}): JSX.Element => {
  const { globals } = useLayout();

  return (
    <>
      <Head key="categoria">
        <title>
          {`${category?.name || 'Produto não encontrado'} - ${
            config.SEO.TITLE
          }`}
        </title>
        <meta
          name="description"
          content={`${category?.name || 'Produto não encontrado'} - ${
            config.SEO.META_DESCRIPTION
          }`}
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
        <HeaderPage name={category.name} subtitle="Categorias" />

        {category && category?.products?.length > 0 && (
          <Flex
            key={category.id}
            width="100%"
            maxWidth="1200px"
            flexWrap="wrap"
            mt="24px"
          >
            {category.products.map((product: any) => (
              <ProductCard
                key={`${category.id}-${product.id}`}
                product={product}
              />
            ))}
          </Flex>
        )}

        {(!category || category.products.length <= 0) && <WithoutProducts />}
      </Flex>
    </>
  );
};

export default CategoryPage;
