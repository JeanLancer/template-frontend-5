import React from 'react';

interface GoogleAdsProps {
  id: string;
}

const GoogleAds: React.FC<GoogleAdsProps> = ({ id }) => {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${id}');
          `
        }}
      />
    </>
  );
};

export default GoogleAds;
