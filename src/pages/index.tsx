import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Flex, Text, Divider, Icon } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CarouselProps, arrowsPlugin } from '@brainhubeu/react-carousel';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
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
      others: products.others,
      specials: products.specials
    }
  };
};

const HomePage = ({
  slides,
  highlights,
  others,
  specials
}: any): JSX.Element => {
  const { globals } = useLayout();

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const { innerWidth } = window;
    setScreenWidth(innerWidth);
  }, []);

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
        <Flex width="100%" maxWidth="1200px" mb="32px" position="relative">
          <Carousel
            plugins={
              slides.length > 1
                ? [
                    {
                      resolve: arrowsPlugin,
                      options: {
                        arrowLeft: (
                          <Flex
                            width="24px"
                            height="24px"
                            alignItems="center"
                            justifyContent="center"
                            backgroundColor="brand.100"
                            p="8px"
                            fontSize="18px"
                            borderRadius="4px"
                            color="white"
                            cursor="pointer"
                            position="absolute"
                            zIndex={100}
                            left="-10px"
                          >
                            <Icon as={BiChevronsLeft} />
                          </Flex>
                        ),
                        arrowRight: (
                          <Flex
                            width="24px"
                            height="24px"
                            alignItems="center"
                            justifyContent="center"
                            backgroundColor="brand.100"
                            p="8px"
                            fontSize="18px"
                            borderRadius="4px"
                            color="white"
                            cursor="pointer"
                            position="absolute"
                            zIndex={100}
                            right="-10px"
                          >
                            <Icon as={BiChevronsRight} />
                          </Flex>
                        ),
                        addArrowClickHandler: true
                      }
                    }
                  ]
                : []
            }
            draggable
          >
            {slides.map((slide: any) => (
              <Flex
                width="1200px"
                height="400px"
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
                <Image
                  layout="fill"
                  src={screenWidth > 1024 ? slide.url_web : slide.url_mobile}
                  alt={slide.name}
                />
              </Flex>
            ))}
          </Carousel>
        </Flex>

        <Flex width="100%" maxWidth="1200px" flexDirection="column">
          <Flex
            width="100%"
            flexDirection="column"
            px="8px"
            mb="16px"
            alignItems="center"
          >
            <Text fontWeight="500" fontSize="26px" color="brand.300">
              Produtos em Destaque
            </Text>
            <Divider width="100%" size="md" />
          </Flex>

          {config.SHOW_SPECIAL ? (
            <Flex width="100%" flexWrap="wrap">
              {specials.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Flex>
          ) : (
            <Flex width="100%" flexWrap="wrap">
              {highlights.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Flex>
          )}

          <Flex width="100%" flexWrap="wrap">
            {highlights.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        </Flex>

        <Flex width="100%" maxWidth="1200px" flexDirection="column">
          <Flex
            width="100%"
            flexDirection="column"
            px="8px"
            mb="16px"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="500" fontSize="26px" color="brand.300">
              Demais Produtos
            </Text>
            <Divider width="100%" size="md" />
          </Flex>

          <Flex width="100%" flexWrap="wrap">
            {others.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default HomePage;
