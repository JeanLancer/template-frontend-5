import React from 'react';

import config from '../../../config';

const GoogleAnalytics: React.FC = () => {
  return (
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
  );
};

export default GoogleAnalytics;
