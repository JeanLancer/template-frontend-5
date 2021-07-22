import React from 'react';

import Lottie from 'react-lottie';

import { Flex } from '@chakra-ui/react';

import animationData from '../../../../assets/lotties/card-loader.json';

const ProductImageLoader: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Flex width="100%" justifyContent="center" alignItems="center">
      <Lottie
        isClickToPauseDisabled
        options={defaultOptions}
        width={280}
        height={200}
        style={{
          maxWidth: 200
        }}
      />
    </Flex>
  );
};

export default ProductImageLoader;
