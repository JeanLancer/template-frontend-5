import React from 'react';

import config from '../../../config';

const ZendeskChat: React.FC = () => {
  return (
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
  );
};

export default ZendeskChat;
