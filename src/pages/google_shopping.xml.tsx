import React from 'react';

import { NextPage, NextPageContext } from 'next';
import config from '../shared/config/index';
import apiGateway from '../shared/services/apiGateway';
import TextUtils from '../shared/utils/TextUtils';

const BASE_URL = config.STORE.DOMAIN;

const createSitemap = (
  products: any[]
): string => `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
    ${products
      .map(
        product => `
            <item>
              <g:id>${product.code_sku}</g:id>
              <title>${product.name}</title>
              <description>${TextUtils.unescapeHTML(
                product.description
              )}</description>
              <link>${BASE_URL}/${product.slug}</link>
              <g:image_link>${product.url_web}</g:image_link>
              <g:condition>new</g:condition>
              <g:availability>in stock</g:availability>
              <g:price>${
                product.is_promotional
                  ? product.price_promotional
                  : product.price_sale
              } BRL</g:price>
              <g:shipping_weight>0 kg</g:shipping_weight>
              <g:brand>${config.SEO.TITLE}</g:brand>
              <g:gtin>7890291177603</g:gtin>
              <g:mpn></g:mpn>
              <g:age_group>adult</g:age_group>
              <g:gender>unisex</g:gender>
              <g:product_type>Flor</g:product_type>
              <g:google_product_category>984</g:google_product_category>
              <g:item_group_id></g:item_group_id>
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
