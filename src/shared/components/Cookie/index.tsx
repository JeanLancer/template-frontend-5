import { Flex, Text, Button, Link } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

// import { Container } from './styles';

const Cookie: React.FC<any> = () => {
  const [showCookieMessage, setShowCookieMessage] = useState(true);

  useEffect(() => {
    const findCookie = localStorage.getItem('@Cookies');

    if (findCookie) {
      setShowCookieMessage(!findCookie);
    }
  }, []);

  const handleCloseCookieMessage = useCallback(() => {
    localStorage.setItem('@Cookies', 'true');
    setShowCookieMessage(false);
  }, []);

  if (showCookieMessage) {
    return (
      <Flex position="fixed" top="0" height="100vh">
        <Flex
          backgroundColor="black"
          color="white"
          flexDirection="column"
          p="16px"
          position="absolute"
          left="10px"
          bottom="10px"
          width="320px"
        >
          <Text fontSize="24px" fontWeight="500" mb="8px">
            Cookies
          </Text>
          <Text
            fontSize="14px"
            textAlign="justify"
            flexWrap="wrap"
            wordBreak="break-all"
            mb="16px"
          >
            Aviso: Utilizamos cookies para personalizar anúncios e melhorar a
            sua experiência no site. Ao continuar navegando, você concorda com a
            nossa
            <Link
              ml="4px"
              fontSize="14px"
              textDecor="underline"
              mb="8px"
              cursor="pointer"
              href="https://www.eflorista.com.br/lgpd/index.html"
              target="_blank"
            >
              Política de Cookies.
            </Link>
          </Text>

          <Button
            backgroundColor="white"
            color="black"
            fontWeight="500"
            onClick={() => handleCloseCookieMessage()}
          >
            Concordar
          </Button>
        </Flex>
      </Flex>
    );
  }

  return <Flex />;
};

export default Cookie;
