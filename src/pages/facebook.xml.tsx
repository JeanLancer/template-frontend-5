import React from 'react';

import { NextPage, NextPageContext } from 'next';
import config from '../shared/config/index';
import apiGateway from '../shared/services/apiGateway';

const BASE_URL = config.STORE.DOMAIN;

const createSitemap = (
  products: any[]
): string => `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
  <title>${config.SEO.TITLE}</title>
  <link>${config.STORE.DOMAIN}</link>
  <description>${config.SEO.META_DESCRIPTION}</description>
    ${products
      .map(
        product => `
            <item>
              <g:id>${product.code_sku}</g:id>
              <g:mpn>${product.code_sku}</g:mpn>
              <g:title>${product.name}</g:title>
              <g:description>${product.description}</g:description>
              <g:link>${BASE_URL}/${product.slug}</g:link>
              <g:image_link>${product.url_web}</g:image_link>
              <g:condition>new</g:condition>
              <g:availability>in stock</g:availability>
              <g:price>${
                product.is_promotional
                  ? product.price_promotional
                  : product.price_sale
              } BRL</g:price>
              <g:product_type>Flor</g:product_type>
            </item>
            `
      )
      .join('')}
</channel>
</rss>
`;

const GoogleShopping: NextPage = () => <></>;

GoogleShopping.getInitialProps = async ({ res }: NextPageContext) => {
  const response = await apiGateway.get<any>('/catalog/google_shopping');

  if (res) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(response.data));
    res.end();
  }
};

export default GoogleShopping;
