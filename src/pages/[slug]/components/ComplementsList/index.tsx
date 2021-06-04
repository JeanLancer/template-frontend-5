import React, { useCallback, useRef } from 'react';

import { Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import ProductCard from '../../../../shared/components/ProductCard';

interface ComplementsListProps {
  products: any[];
}

const ComplementsList: React.FC<ComplementsListProps> = ({ products }) => {
  const ref = useRef<any>();

  const handleSlide = useCallback((positon: number) => {
    ref.current.scrollTo({
      top: 0,
      left: ref?.current.scrollLeft + positon * ref.current.offsetWidth,
      behavior: 'smooth'
    });
  }, []);

  return (
    <Flex width="100%" flexDirection="column">
      <Flex width="100%" justifyContent="center" alignItems="center" mb="8px">
        <Flex width="100%" flexDirection="column">
          <Text
            as="h1"
            fontSize="16px"
            color="gray.600"
            textTransform="uppercase"
            fontWeight="500"
          >
            Compre também
          </Text>

          <Divider width="100%" borderColor="gray.400" />
        </Flex>
      </Flex>

      <Flex width="100%" mt="8px" position="relative" flexDirection="column">
        <Flex ref={ref} width="100%" overflow="hidden">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Flex>

        <Flex
          top="40%"
          width="100%"
          justifyContent="space-between"
          position="absolute"
          color="white"
          fontWeight={500}
        >
          <Flex
            backgroundColor="gray.200"
            color="gray.600"
            borderRadius="4px"
            fontSize="32px"
            cursor="pointer"
            onClick={() => handleSlide(-1)}
          >
            <Icon as={BiChevronLeft} />
          </Flex>
          <Flex
            backgroundColor="gray.200"
            color="gray.600"
            borderRadius="4px"
            fontSize="32px"
            cursor="pointer"
            onClick={() => handleSlide(1)}
          >
            <Icon as={BiChevronRight} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ComplementsList;
