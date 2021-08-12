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
    <Box width="100%" maxWidth={maxWidth} mb="2px">
      <Flex width="100%" textAlign="center">
        <Text fontSize="14px">{label}</Text>
        {isRequired && (
          <Text ml="4px" color="red.500">
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
        pl="0px"
        size="sm"
        border="2px solid"
        borderColor="gray.200"
        autoComplete="new-password"
        autoSave="off"
        autoCorrect="off"
        _placeholder={{
          pl: '0px'
        }}
      >
        {children}
      </ChakraSelect>
    </Box>
  );
};

export default Select;
