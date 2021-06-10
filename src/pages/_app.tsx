import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import type { AppProps } from 'next/app';
import Layout from '../shared/components/Layout';
import { LayoutProvider } from '../shared/contexts/LayoutContext';
import Fonts from '../shared/styles/Fonts';
import config from '../shared/config/index';
import WhatsButton from '../shared/components/WhatsButton';

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

        {config.JIVOCHAT && config.SITE_IS_ENABLED && (
          <script src={`//code.jivosite.com/widget/${config.JIVOCHAT}`} async />
        )}

        {config.FACEBOOK.PIXEL.ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${config.FACEBOOK.PIXEL.ID}');
                fbq('track', 'PageView');
              `
              }}
            />

            <noscript>
              <img
                height="1"
                width="1"
                style={{
                  display: 'none'
                }}
                src={`https://www.facebook.com/tr?id=${config.FACEBOOK.PIXEL.ID}&ev=PageView&noscript=1`}
                alt="Facebook Pixel"
              />
            </noscript>
          </>
        )}
      </Head>
      <LayoutProvider>
        <Layout>
          <Fonts />
          <Component {...pageProps} />
          <WhatsButton />
        </Layout>
      </LayoutProvider>
    </>
  );
};

export default MyApp;
