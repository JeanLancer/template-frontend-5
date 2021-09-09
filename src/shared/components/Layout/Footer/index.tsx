import React from 'react';

import { Flex, Text, Icon } from '@chakra-ui/react';

import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin } from 'react-icons/fi';
import { FooterStyles, useLayout } from '../../../contexts/LayoutContext';
import config from '../../../config';

import eflorista from '../../../../assets/images/logo-eflorista.png';
import siteseguro from '../../../../assets/images/siteseguro.png';
import paymentMethods from '../../../../assets/images/payment-methods.png';
import { useData } from '../../../hooks/data';

interface FooterProps {
  styles: FooterStyles;
}

const Footer: React.FC<FooterProps> = ({ styles }) => {
  const { backgroundColor, ...rest } = styles.copyrightBar;
  const data = useData();
  const { globals } = useLayout();

  return (
    <Flex
      width="100%"
      alignItems="center"
      flexDirection="column"
      mt="auto"
      boxShadow="0 3px 6px rgba(0,0,0,0.16)"
      backgroundColor="gray.50"
    >
      <Flex
        width="100%"
        maxWidth="1200px"
        py="24px"
        justifyContent="space-between"
        flexWrap="wrap"
        px={globals.paddingX}
      >
        <Flex width={['100%', '100%', '50%']} justifyContent="space-between">
          <Flex flexDirection="column" color="gray.600">
            <Text>Categorias</Text>

            <Flex width="100%" flexDirection="column" fontSize="12px">
              {data.categories?.footer.map(category => (
                <Link key={category.slug} href={`/categorias/${category.slug}`}>
                  <Text height="24px" cursor="pointer">
                    {category.name}
                  </Text>
                </Link>
              ))}
            </Flex>

            {data.options?.footer.show_address && (
              <Flex
                width="100%"
                alignItems="center"
                mt={['24px', '24px', 'auto']}
                mb={['24px', '24px', '0px']}
              >
                <Icon as={FiMapPin} mr="8px" />
                <Text fontSize="14px">
                  {`${data.general_settings.street}, nº ${
                    data.general_settings.number
                  }, ${` ${data.general_settings.complement} `}${
                    data.general_settings.neighborhood
                  }
      - ${data.general_settings.city}/${config.STORE.LOCATION.STATE}`}
                </Text>
              </Flex>
            )}
          </Flex>

          <Flex flexDirection="column" color="gray.600">
            <Text>Páginas</Text>

            <Flex width="100%" flexDirection="column" fontSize="12px">
              <Link key="Acompanhar meu pedido" href="/acompanhar-meu-pedido">
                <Text height="24px">Acompanhar meu Pedido</Text>
              </Link>

              {data.pages?.map(page => (
                <Link key={page.slug} href={`/paginas/${page.slug}`}>
                  <Text height="24px">{page.title}</Text>
                </Link>
              ))}
            </Flex>
          </Flex>
        </Flex>

        <Flex
          flexDirection="column"
          color="gray.600"
          ml={['0px', '0px', 'auto']}
        >
          <Text>Pague com</Text>
          <Image
            layout="fixed"
            src={paymentMethods}
            width={296}
            height={48}
            alt="Formas de Pagamento"
          />

          <Flex ml="auto" mt="16px" mx="auto">
            <Image
              layout="fixed"
              src={siteseguro}
              width={104}
              height={48}
              alt="Site Seguro SSL"
            />
          </Flex>

          <Flex
            flexDirection="column"
            justifyContent="center"
            cursor="pointer"
            display={['none', 'none', 'block']}
            ml="auto"
            mx="auto"
            mt="24px"
          >
            <Text fontSize="14px">Desenvolvido por: </Text>
            <Flex justifyContent="center">
              <Link href="https://www.eflorista.com.br">
                <Image
                  layout="fixed"
                  src={eflorista}
                  width={80}
                  height={32}
                  alt="Sistema para floriculturas Eflorista"
                  title="Sistema para floriculturas Eflorista"
                />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        width="100%"
        backgroundColor={backgroundColor}
        justifyContent="center"
      >
        <Flex
          width="100%"
          maxWidth="1200px"
          {...rest}
          justifyContent="space-between"
          flexDirection={['column', 'column', 'row']}
          alignItems="center"
        >
          <Flex
            width={['100%', '100%', '50%']}
            flexDirection="column"
            mb={['16px', '16px', '0px']}
          >
            <Text>{`Copyright © ${config.STORE.NAME}. Todos os direitos reservados.`}</Text>

            {data.options?.footer.show_document && (
              <Text textAlign="left">
                {`CNPJ n.º ${data.general_settings.document}`}
              </Text>
            )}

            {data.options?.footer.show_email && (
              <Text>{`Email: ${data.general_settings.email_contact}`}</Text>
            )}
          </Flex>

          <Flex
            flexDirection="column"
            alignItems="flex-end"
            cursor="pointer"
            display={['block', 'block', 'none']}
          >
            <Link href="https://www.eflorista.com.br">
              <Image
                layout="fixed"
                src={eflorista}
                width={80}
                height={32}
                alt="Sistema para floriculturas Eflorista"
                title="Sistema para floriculturas Eflorista"
              />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
