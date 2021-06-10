import React from 'react';
import config from '../shared/config';

const getRobots = (): string => `User-agent: *
Allow: /

Sitemap: ${config.STORE.DOMAIN}/sitemap.xml
`;

class Sitemap extends React.Component {
  public static async getInitialProps({ res }: any): Promise<void> {
    res.setHeader('Content-Type', 'text/plain');
    res.write(getRobots());
    res.end();
  }
}

export default Sitemap;
