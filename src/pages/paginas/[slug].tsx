import React, { useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import ParseHtml from 'html-react-parser';

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

  return page ? (
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

        {page?.content && (
          <Flex flexDirection="column">{ParseHtml(page.content)}</Flex>
        )}
      </Flex>
    </>
  ) : null;
};

export default PaginasPage;
