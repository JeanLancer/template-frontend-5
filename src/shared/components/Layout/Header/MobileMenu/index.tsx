import React from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { BiFilterAlt, BiHome } from 'react-icons/bi';
import { FiChevronRight } from 'react-icons/fi';
import { motion, Variants } from 'framer-motion';
import ArrowBox from '../../../ArrowBox';

export interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  const variants: Variants = {
    open: {
      opacity: 1
    },
    closed: {
      opacity: 0
    }
  };

  return (
    <motion.nav
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
    >
      <Flex
        display={['flex', 'flex', 'none']}
        width="100%"
        backgroundColor="white"
        height="100vh"
        position="absolute"
        zIndex={1000}
        boxShadow="0 1px 3px rgba(0,0,0,0.12)"
      >
        <Flex width="100%" flexDirection="column" position="relative">
          <ArrowBox
            right={['44px', '52px']}
            boxShadow="0 1px 3px rgba(0,0,0,0.12)"
            top="-8px"
            backgroundColor="gray.50"
          />
          <Flex
            width="100%"
            fontSize="12px"
            justifyContent="space-between"
            backgroundColor="gray.50"
            color="gray.600"
            py="8px"
            px="16px"
            boxShadow="0 1px 3px rgba(0,0,0,0.12)"
          >
            <Text>Atendimento das 8h as 24h</Text>
            <Text>800 452 326</Text>
          </Flex>

          <Flex
            width="100%"
            flexDirection="column"
            backgroundColor="white"
            mt="16px"
          >
            <Flex
              width="100%"
              alignItems="center"
              px="24px"
              py="8px"
              backgroundColor="gray.50"
              color="gray.800"
            >
              <Icon as={BiHome} mr="16px" fontSize="20px" />
              <Text fontSize="14px">Início</Text>
            </Flex>
            <Flex
              width="100%"
              alignItems="center"
              px="24px"
              py="8px"
              color="gray.800"
            >
              <Icon as={BiFilterAlt} mr="16px" fontSize="20px" />
              <Text fontSize="14px">Categorias</Text>
            </Flex>
            <Flex
              width="100%"
              alignItems="center"
              px="24px"
              py="4px"
              color="gray.800"
              fontSize="12px"
            >
              <Text ml="48px" mr="4px">
                Arranjos
              </Text>
              <Icon as={FiChevronRight} mt="2px" />
            </Flex>

            <Flex
              width="100%"
              alignItems="center"
              px="24px"
              py="4px"
              color="gray.800"
              fontSize="12px"
            >
              <Text ml="48px" mr="4px">
                Buquês
              </Text>
              <Icon as={FiChevronRight} mt="2px" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </motion.nav>
  );
};

export default MobileMenu;
