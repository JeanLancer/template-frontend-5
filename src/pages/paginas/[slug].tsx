import React, { useEffect, useState } from 'react';

import { Flex, Box } from '@chakra-ui/react';

import { NextPage, GetServerSideProps, GetStaticPropsContext } from 'next';

import Head from 'next/head';

import config from '../../shared/config/index';
import { useData } from '../../shared/hooks/data';
import TextUtils from '../../shared/utils/TextUtils';
import HeaderPage from '../../shared/components/HeaderPage';

interface IProps {
  slug: any;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetStaticPropsContext
) => {
  const { slug } = ctx.params as { slug: string };

  return { props: { slug } };
};

const PaginasPage: NextPage<IProps> = ({ slug }) => {
  const [page, setPage] = useState() as any;
  const { pages } = useData();

  useEffect(() => {
    setPage(pages?.find(item => item.slug === slug) as any);
  }, [pages, setPage, slug]);

  return (
    <>
      <Head key="page">
        <title>{`${page?.title} - ${config.SEO.TITLE}`}</title>
        <meta
          name="description"
          content={`${TextUtils.clearHTMLString(page?.meta_description)}`}
        />
      </Head>
      <Flex width="100" flexDirection="column">
        <HeaderPage name={page?.title} subtitle="Paginas" />

        <Flex width="100%" fontSize="24px">
          <Box
            width="100%"
            py="8px"
            fontSize="16px"
            whiteSpace="pre-wrap"
            dangerouslySetInnerHTML={{ __html: page?.content }}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default PaginasPage;
