import React, { useRef, useEffect } from 'react';

import {
  Flex,
  Box,
  Select as ChakraSelect,
  Text,
  SelectProps
} from '@chakra-ui/react';

import { useField } from '@unform/core';

interface IProps extends SelectProps {
  name: string;
  label: string;
  isRequired?: boolean;
  maxWidth?: string;
}

const Select: React.FC<IProps> = ({
  name,
  label,
  children,
  isRequired,
  maxWidth,
  ...rest
}) => {
  const inputRef = useRef<HTMLSelectElement>(null);

  const { fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <Box width="100%" maxWidth={maxWidth} mb="4px">
      <Flex width="100%" textAlign="center">
        <Text fontSize="12px">{label}</Text>
        {isRequired && (
          <Text ml="8px" color="red.500">
            *
          </Text>
        )}
      </Flex>
      <ChakraSelect
        ref={inputRef}
        name={name}
        isInvalid={!!error}
        focusBorderColor="none"
        {...rest}
      >
        {children}
      </ChakraSelect>
    </Box>
  );
};

export default Select;
