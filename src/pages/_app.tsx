import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import type { AppProps } from 'next/app';
import Layout from '../shared/components/Layout';
import { LayoutProvider } from '../shared/contexts/LayoutContext';
import config from '../shared/config/index';
import WhatsButton from '../shared/components/WhatsButton';
import Fonts from '../shared/styles/Fonts';

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

        {config.ZENDESK && config.SITE_IS_ENABLED && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
            d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
            _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');
            $.src='//v2.zopim.com/?${config.ZENDESK}';z.t=+new Date;$.
            type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');
          `
            }}
          />
        )}
      </Head>
      <LayoutProvider>
        <Layout>
          <Component {...pageProps} />
          <WhatsButton />
          <Fonts />
        </Layout>
      </LayoutProvider>
    </>
  );
};

export default MyApp;
