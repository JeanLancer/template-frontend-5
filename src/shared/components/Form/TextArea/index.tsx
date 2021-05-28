import React, { useRef, useEffect } from 'react';

import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import { useField } from '@unform/core';

interface IProps {
  name: string;
}

const TextArea: React.FC<IProps> = ({ name }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <ChakraTextarea
      ref={inputRef}
      width="100%"
      name={name}
      fontSize="14px"
      focusBorderColor="none"
      borderRadius="2px"
      px="16px"
    />
  );
};

export default TextArea;
