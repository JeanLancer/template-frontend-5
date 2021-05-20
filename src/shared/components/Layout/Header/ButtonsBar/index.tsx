import React from 'react';
import { BiCartAlt, BiHeart } from 'react-icons/bi';

import { Divider, Icon, Stack } from '@chakra-ui/react';

const ButtonsBar: React.FC = () => {
  return (
    <Stack direction="row" fontSize="28px" color="gray.500" alignItems="center">
      <Icon as={BiHeart} />
      <Divider orientation="vertical" height="24px" borderColor="gray.400" />
      <Icon as={BiCartAlt} />
    </Stack>
  );
};

export default ButtonsBar;
