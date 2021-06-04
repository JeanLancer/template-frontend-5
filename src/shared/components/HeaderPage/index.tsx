import { Flex, Text, Icon, Divider } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { BiChevronsRight } from 'react-icons/bi';

interface HeaderPageProps {
  name: string;
  subtitle: string;
}

const HeaderPage: React.FC<HeaderPageProps> = ({ name, subtitle }) => {
  return (
    <Flex
      width="100%"
      alignItems="center"
      py="8px"
      fontSize="24px"
      fontWeight="500"
      color="gray.600"
      flexDirection="column"
    >
      <Text as="h1">{name}</Text>

      <Flex flexDirection="column">
        <Flex fontSize="12px">
          <Link href="/">
            <Text cursor="pointer">Ínicio</Text>
          </Link>
          <Text mx="4px">
            <Icon as={BiChevronsRight} />
          </Text>
          <Text>{subtitle}</Text>
          <Text mx="4px">
            <Icon as={BiChevronsRight} />
          </Text>
          <Text color="gray.600">{name}</Text>
        </Flex>
        <Divider mt="4px" />
      </Flex>
    </Flex>
  );
};

export default HeaderPage;
