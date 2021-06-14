import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import Image from 'next/image';
import Link from 'next/link';
import { FooterStyles, useLayout } from '../../../contexts/LayoutContext';
import config from '../../../config';

import eflorista from '../../../../assets/images/logo-eflorista.png';
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
                <Link key={category.slug} href={`/categoria/${category.slug}`}>
                  {category.name}
                </Link>
              ))}
            </Flex>
          </Flex>

          <Flex flexDirection="column" color="gray.600">
            <Text>Páginas</Text>

            <Flex width="100%" flexDirection="column" fontSize="12px">
              <Link key="Acompanhar meu pedido" href="/acompanhar-meu-pedido">
                Acompanhar meu Pedido
              </Link>

              {data.pages?.map(page => (
                <Link key={page.slug} href={`/paginas/${page.slug}`}>
                  {page.title}
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
          <Image layout="fixed" src={paymentMethods} width={296} height={48} />
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

            {data.options?.footer.show_document &&
              data.options?.footer.show_address && (
                <Text textAlign="justify">
                  {`CNPJ n.º ${data.general_settings.document} / ${data.general_settings.street}, nº ${data.general_settings.number}, ${data.general_settings.neighborhood}
                  - ${data.general_settings.city}/${config.STORE.LOCATION.STATE}. Email: ${data.general_settings.email_contact}`}
                </Text>
              )}
          </Flex>

          <Flex flexDirection="column" alignItems="flex-end" cursor="pointer">
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
