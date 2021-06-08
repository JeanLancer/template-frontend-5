import React from 'react';
import { BiCartAlt } from 'react-icons/bi';
import { FiMenu, FiX } from 'react-icons/fi';

import { Box, Flex, Icon, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useCart } from '../../../../hooks/cart';

interface ButtonsBarProps {
  isOpen: boolean;
  menuButtonFunction: () => void;
}

const ButtonsBar: React.FC<ButtonsBarProps> = ({
  isOpen,
  menuButtonFunction
}) => {
  const { cartData } = useCart();

  return (
    <Stack
      direction="row"
      fontSize="24px"
      color="gray.500"
      alignItems="center"
      ml="24px"
    >
      <Icon
        color="brand.100"
        as={isOpen ? FiX : FiMenu}
        mr="4px"
        display={['block', 'block', 'none']}
        onClick={menuButtonFunction}
      />

      <Link href="/checkout">
        <Box position="relative" cursor="pointer">
          <Icon color="brand.100" as={BiCartAlt} />

          {cartData.itens.length > 0 && (
            <Flex
              width="16px"
              height="16px"
              borderRadius="50%"
              backgroundColor="brand.200"
              alignItems="center"
              justifyContent="center"
              color="white"
              position="absolute"
              p="0px"
              top="4px"
              right="-6px"
              fontSize="12px"
            >
              {cartData.itens.length}
            </Flex>
          )}
        </Box>
      </Link>
    </Stack>
  );
};

export default ButtonsBar;
