import { Flex, Text } from "@chakra-ui/react";

const HomePage = (): JSX.Element => {
  return (
    <Flex
      fontSize="32px"
      width="100%"
      height="400px"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontWeight="500" color="gray.400">
        EM CONSTRUÇÃO
      </Text>
    </Flex>
  );
};

export default HomePage;
