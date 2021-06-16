import React from 'react';
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
import GoogleAnalytics from '../shared/components/3rd-party/GoogleAnalytics';
import GoogleAds from '../shared/components/3rd-party/GoogleAds';
import ZendeskChat from '../shared/components/3rd-party/ZendeskChat';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { publicRuntimeConfig } = getConfig();

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

        {config.GOOGLE.TAG.ID && <GoogleAds />}

        {config.GOOGLE.ANALYTICS.ID && <GoogleAnalytics />}

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
