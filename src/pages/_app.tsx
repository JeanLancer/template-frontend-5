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
import ZendeskChat from '../shared/components/3rd-party/ZendeskChat';
import apiGateway from '../shared/services/apiGateway';
import Cookie from '../shared/components/Cookie';

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

        {config.GOOGLE.TAG.MANAGER && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.GOOGLE.TAG.MANAGER}');
          `
            }}
          />
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

        {config.GOOGLE.DOMAIN_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={`${config.GOOGLE.DOMAIN_VERIFICATION}`}
          />
        )}

        {config.FACEBOOK.DOMAIN_VERIFICATION && (
          <meta
            name="facebook-domain-verification"
            content={config.FACEBOOK.DOMAIN_VERIFICATION}
          />
        )}

        {config.FACEBOOK.PIXEL.ID && (
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
        )}
      </Head>
      <LayoutProvider>
        {config.GOOGLE.TAG.MANAGER && (
          <noscript>
            <iframe
              title="Google Tag Manager"
              src={`https://www.googletagmanager.com/ns.html?id=${config.GOOGLE.TAG.MANAGER}`}
              height="0"
              width="0"
              style={{
                display: 'none',
                visibility: 'hidden'
              }}
            />
          </noscript>
        )}
        <Layout>
          <Component {...pageProps} />
          <WhatsButton />
          <Fonts />
        </Layout>

        {config.ZENDESK && config.SITE_IS_ENABLED && <ZendeskChat />}

        {config.HOTJAR && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${config.HOTJAR},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `
            }}
          />
        )}

        {config.FACEBOOK.PIXEL.ID && (
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
        )}

        <Cookie />
      </LayoutProvider>
    </>
  );
};

export default MyApp;
