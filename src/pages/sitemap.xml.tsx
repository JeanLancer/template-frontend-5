import React from 'react';

import { NextPage, NextPageContext } from 'next';

import storeConfig from '../shared/config/index';
import apiGateway from '../shared/services/apiGateway';

const BASE_URL = storeConfig.STORE.DOMAIN;

const createSitemap = (
  products: any,
  categories: any
): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${`${BASE_URL}`}</loc>
    </url>
    ${products
      .map(
        (product: any) => `
                <url>
                    <loc>${`${BASE_URL}/${product.slug}`}</loc>
                </url>
            `
      )
      .join('')}
    ${categories
      .map(
        (category: any) => `
                  <url>
                      <loc>${`${BASE_URL}/categorias/${category.slug}`}</loc>
                  </url>
              `
      )
      .join('')}
</urlset>
`;

const Sitemap: NextPage = () => <></>;

Sitemap.getInitialProps = async ({ res }: NextPageContext) => {
  const response = await apiGateway.get<any>('/catalog/sitemap');
  const { categories, products } = response.data;

  if (res) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(products, categories));
    res.end();
  }
};

export default Sitemap;
