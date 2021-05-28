import { BoxProps, Flex } from '@chakra-ui/react';
import React from 'react';

const ArrowBox: React.FC<BoxProps> = ({ ...rest }) => {
  return (
    <Flex
      width="24px"
      height="24px"
      backgroundColor="white"
      transform="rotate(45deg)"
      position="absolute"
      zIndex={-100}
      {...rest}
    />
  );
};

export default ArrowBox;
