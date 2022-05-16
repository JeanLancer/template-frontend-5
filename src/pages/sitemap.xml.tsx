import React from 'react';

import { NextPage, NextPageContext } from 'next';

import storeConfig from '../shared/config/index';
import apiGateway, { apiEflorista } from '../shared/services/apiGateway';

const BASE_URL = storeConfig.STORE.DOMAIN;

const createSitemap = (
  products: any,
  categories: any,
  cities: any
): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${`${BASE_URL}`}</loc>
    </url>
    ${cities
      .map(
        (city: any) => `
                  <url>
                      <loc>${`${BASE_URL}/floricultura-em/${city.slug}`}</loc>
                  </url>
              `
      )
      .join('')}
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
  const response2 = await apiEflorista.get('/cities');

  const { categories, products } = response.data;
  const cities = response2.data;

  if (res) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(products, categories, cities));
    res.end();
  }
};

export default Sitemap;
