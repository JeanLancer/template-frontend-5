import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import type { AppProps } from 'next/app';
import Layout from '../shared/components/Layout';
import { LayoutProvider } from '../shared/contexts/LayoutContext';
import config from '../shared/config/index';
import WhatsButton from '../shared/components/WhatsButton';
import Fonts from '../shared/styles/Fonts';
import Jivochat from '../shared/components/3rd-party/Jivochat';
import FacebookPixel from '../shared/components/3rd-party/FacebookPixel';
import ZendeskChat from '../shared/components/3rd-party/ZendeskChat';
import apiGateway from '../shared/services/apiGateway';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { publicRuntimeConfig } = getConfig();

  const [, setIntegrationsData] = useState<any>(null);

  useEffect(() => {
    apiGateway.get<any>('/stores/setup').then(response => {
      const { integrations } = response.data;

      setIntegrationsData(integrations);
    });
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta key="author" name="author" content="Eflorista by W2P Solutions" />
        <link
          rel="shortcut icon"
          href={`/images/favicon-${publicRuntimeConfig.LOGO}`}
        />

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

        {config.GOOGLE.ANALYTICS.ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.GOOGLE.ANALYTICS.ID}`}
            />

            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${config.GOOGLE.ANALYTICS.ID}');
              `
              }}
            />
          </>
        )}

        {config.JIVOCHAT && config.SITE_IS_ENABLED && <Jivochat />}

        {config.FACEBOOK.PIXEL.ID && <FacebookPixel />}
      </Head>
      <LayoutProvider>
        <Layout>
          <Component {...pageProps} />
          <WhatsButton />
          <Fonts />
        </Layout>
        {config.ZENDESK && config.SITE_IS_ENABLED && <ZendeskChat />}
      </LayoutProvider>
    </>
  );
};

export default MyApp;
