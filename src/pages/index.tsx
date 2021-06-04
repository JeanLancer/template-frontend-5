import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Flex, Text, Divider } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CarouselProps } from '@brainhubeu/react-carousel';
import ProductCard from '../shared/components/ProductCard';
import apiGateway from '../shared/services/apiGateway';
import { useLayout } from '../shared/contexts/LayoutContext';
import config from '../shared/config/index';
import '@brainhubeu/react-carousel/lib/style.css';

const Carousel = dynamic<CarouselProps>(
  () => {
    return import('@brainhubeu/react-carousel').then(mod => {
      return mod.default;
    });
  },
  {
    ssr: false
  }
);

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await apiGateway.get('/catalog/home');

  const { banners, products } = response.data;

  return {
    props: {
      slides: banners.slides,
      highlights: products.highlights,
      others: products.others
    }
  };
};

const HomePage = ({ slides, highlights }: any): JSX.Element => {
  const { globals } = useLayout();

  return (
    <>
      <Head key="index">
        <title>{config.SEO.TITLE}</title>
        <meta name="description" content={config.SEO.META_DESCRIPTION} />
      </Head>
      <Flex
        fontSize="32px"
        width="100%"
        justifyContent="center"
        alignItems="center"
        py="24px"
        px={globals.paddingX}
        flexDirection="column"
      >
        <Flex width="100%" maxWidth="1200px" mb="32px">
          <Carousel plugins={slides.length > 1 ? ['arrows'] : []} draggable>
            {slides.map((slide: any) => (
              <Flex
                width="1200px"
                height="300px"
                backgroundColor="gray.700"
                alignItems="center"
                justifyContent="center"
                key={slide.name}
                cursor={slide.link ? 'pointer' : 'default'}
                onClick={() => {
                  if (slide.link) {
                    window.location.href = slide.link;
                  }
                }}
              >
                <Image layout="fill" src={slide.url_web} alt={slide.name} />
              </Flex>
            ))}
          </Carousel>
        </Flex>

        <Flex width="100%" maxWidth="1200px" flexDirection="column">
          <Flex width="100%" flexDirection="column" px="8px" mb="16px">
            <Text fontWeight="500" fontSize="20px" color="gray.800">
              Flores em Destaque
            </Text>
            <Divider width="100%" size="md" />
          </Flex>

          <Flex width="100%" flexWrap="wrap">
            {highlights.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        </Flex>

        {/* <Flex flexDirection="column">
          <Flex width="100%" flexDirection="column" px="8px" mb="16px">
            <Text fontWeight="500" fontSize="20px" color="gray.800">
              Demais Produtos
            </Text>
            <Divider width="100%" size="md" />
          </Flex>

          <Flex width="100%" flexWrap="wrap">
            {others.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        </Flex> */}
      </Flex>
    </>
  );
};

export default HomePage;
