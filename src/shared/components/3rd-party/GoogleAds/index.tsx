import React from 'react';

import config from '../../../config';

const GoogleAds: React.FC = () => {
  return (
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
  );
};

export default GoogleAds;
