import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import Layout from '../shared/components/Layout';
import { LayoutProvider } from '../shared/contexts/LayoutContext';
import Fonts from '../shared/styles/Fonts';
import config from '../shared/config/index';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta key="author" name="author" content="W2P Solution" />

        {config.GOOGLE.TAG.ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.GOOGLE.TAG.ID}`}
            />

            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${config.GOOGLE.TAG.ID}');
                `
              }}
            />
          </>
        )}

        {config.GOOGLE.TAG.ID && (
          <script src={`//code.jivosite.com/widget/${config.JIVOCHAT}`} async />
        )}
      </Head>
      <LayoutProvider>
        <Layout>
          <Fonts />
          <Component {...pageProps} />
        </Layout>
      </LayoutProvider>
    </>
  );
};

export default MyApp;
