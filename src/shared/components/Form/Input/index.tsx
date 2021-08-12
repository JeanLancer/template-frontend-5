import React, { useRef, useEffect } from 'react';

import { useField } from '@unform/core';
import InputMask from 'react-input-mask';

import { Flex, Input as ChakraInput, Text, InputProps } from '@chakra-ui/react';

interface Props extends InputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  mask?: string;
  formatChars?: {
    [key: string]: string;
  };
  maskChar?: string;
}

const Input: React.FC<Props> = ({
  name,
  label,
  isRequired = false,
  mask = '',
  mb = '4px',
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <Flex width="100%" flexDirection="column" mb={mb}>
      <Flex width="100%" textAlign="center">
        <Text fontSize="14px">{label}</Text>
        {isRequired && (
          <Text ml="4px" color="red.500">
            *
          </Text>
        )}
      </Flex>

      <Flex
        width="100%"
        flexDirection="column"
        position="relative"
        flexWrap="wrap"
      >
        <InputMask mask={mask} value={rest.value} onChange={rest.onChange}>
          {(inputProps: any) => (
            <ChakraInput
              ref={inputRef}
              name={name}
              isInvalid={!!error}
              autoComplete="new-password"
              spellCheck="false"
              autoSave="off"
              autoCorrect="off"
              errorBorderColor="red.500"
              focusBorderColor="none"
              size="sm"
              border="2px solid"
              borderColor="gray.200"
              onFocus={e => {
                if (e.target.autocomplete) {
                  e.target.autocomplete = 'new-password';
                }
              }}
              {...inputProps}
              {...rest}
            />
          )}
        </InputMask>
      </Flex>
    </Flex>
  );
};

export default Input;
