import React, { useCallback, useState } from 'react';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import Dropzone from 'react-dropzone';
import { FiAlertTriangle, FiCheck } from 'react-icons/fi';
import { BiCloudUpload } from 'react-icons/bi';
import axios from 'axios';
import imgObrigado from '../../../assets/images/tela-obrigado.png';
import config from '../../../shared/config/index';
import { useLayout } from '../../../shared/contexts/LayoutContext';
import { apiEflorista } from '../../../shared/services/apiGateway';
import { HTTP_RESPONSE } from '../../../shared/constants';
import NumberUtils from '../../../shared/utils/NumberUtils';

interface CheckoutLastPageProps {
  order: any;
  payment: any;
  picpayData?: any;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await apiEflorista.get(
    `/orders/details/${ctx.params?.code}`
  );

  const order = response.data;

  let picpayData = null;
  if (order.payment_method.type === 'PICPAY') {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    const responsePicpay = await axios.post(
      'https://appws.picpay.com/ecommerce/public/payments',
      {
        referenceId: `${order.code} - ${Date.now()}`,
        callbackUrl: `https://master.wsuite.com.br/api/v1/orders/payment_status?status=APROVADO&store_id=3e4ab6bd-ba02-4d50-8b0b-beaf9f289eb3&order_code=${order.code}`,
        expiresAt,
        returnUrl: 'http://www.picpay.com/#transacaoConcluida',
        value: order.total_value,
        additionalInfo: [null],
        buyer: {
          firstName: order.buyer.name.split(' ')[0],
          lastName: order.buyer.name.split(' ')[1],
          document: order.buyer.document
        }
      },
      {
        headers: {
          'x-picpay-token': 'a8afcc80-d747-474c-84ba-0201a29f1a9e'
        }
      }
    );

    picpayData = responsePicpay.data;
  }

  return { props: { order, picpayData } };
};

const CheckoutLastPage: NextPage<CheckoutLastPageProps> = ({
  order,
  picpayData
}) => {
  const { globals } = useLayout();

  const toast = useToast();

  const [uploadedFile, setUploadedFile] = useState({
    file: '',
    name: '',
    preview: '',
    uploaded: false,
    isLoading: false,
    progress: 0
  });

  const handleUpload = useCallback(
    async file => {
      const fileUploaded: any = {
        file: file[0],
        name: file[0].name,
        preview: URL.createObjectURL(file[0]),
        uploaded: false,
        isLoading: false,
        progress: 0
      };

      setUploadedFile(fileUploaded);

      try {
        if (uploadedFile) {
          const datForm = new FormData();
          datForm.append('files', fileUploaded.file, fileUploaded.name);

          const response = await apiEflorista.patch(
            `/orders/${order.code}/voucher`,
            datForm,
            {
              onUploadProgress: e => {
                const progress = parseInt(
                  Math.round((e.loaded * 100) / e.total).toString(),
                  10
                );

                setUploadedFile((oldState: any) => {
                  return {
                    ...oldState,
                    isLoading: progress !== 100,
                    progress
                  };
                });
              }
            }
          );

          if (response.status === HTTP_RESPONSE.STATUS.SUCCESS) {
            toast({
              title: 'Comprovante Anexado',
              description: 'O comprovante foi anexado com sucesso',
              status: 'success',
              duration: 4000,
              isClosable: true
            });
          } else {
            toast({
              title: 'Ocorreu um problema',
              description: 'Não foi possível anexar o comprovante.',
              status: 'success',
              duration: 4000,
              isClosable: true
            });
          }
        }
      } catch (e) {
        toast({
          title: 'Ocorreu um problema',
          description: 'Não foi possível anexar o comprovante.',
          status: 'success',
          duration: 4000,
          isClosable: true
        });

        console.log('log', e);
      }
    },
    [order, toast, uploadedFile]
  );

  return (
    order && (
      <Flex width="100%" justifyContent="center">
        <Head key="checkout-last-page">
          <title>{`Pedido Efetuado - ${config.SEO.TITLE}`}</title>

          {config.GOOGLE.TAG.ID && config.GOOGLE.TAG.SEND_TO && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  gtag('event', 'conversion', {
                    'send_to': '${config.GOOGLE.TAG.ID}/${
                    config.GOOGLE.TAG.SEND_TO
                  }',
                    'value': ${Number(order.total_value) || 100},
                    'currency': 'BRL',
                    'transaction_id': '${order.code}'
                  });
                `
                }}
              />
            </>
          )}
        </Head>
        <Flex
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          fontWeight="500"
          fontSize="24px"
          flexDirection="column"
          py="42px"
          maxWidth="1200px"
          px={globals.paddinX}
        >
          <Image src={imgObrigado} alt="Obrigado pela compra" />
          <Text as="h1" color="black" fontSize="24px">
            Pedido Finalizado.
          </Text>
          <Text fontSize="16px">Seu pedido foi efetuado com sucesso.</Text>

          <Flex fontSize={['16px', '16px']}>
            <Text mr="8px">Número do seu Pedido:</Text>
            <Text color="green.500">{order.code}</Text>
          </Flex>

          {order.payment_method.type === 'PICPAY' && (
            <Flex
              mt="48px"
              flexDirection="column"
              width="100%"
              maxWidth="600px"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
            >
              <Text color="green.500" fontSize="18px" fontWeight="500">
                Escaneie seu QR Code Picpay
              </Text>

              <Flex width="200px" height="200px">
                <Image src={picpayData.qrcode.base64} />
              </Flex>

              <Flex
                mt="16px"
                width="100%"
                fontSize="16px"
                justifyContent="center"
                textTransform="uppercase"
              >
                <Text>Valor a ser pago: </Text>
                <Text ml="8px" color="black">
                  {NumberUtils.toCurrency(order.total_value)}
                </Text>
              </Flex>
            </Flex>
          )}

          {order.payment_method.type === 'DEPOSIT' && (
            <Flex
              flexDirection="column"
              width="100%"
              maxWidth="600px"
              textAlign="center"
            >
              <Text fontSize="14px" mt="16px">
                Efetue uma transferência/PIX para a conta com os dados abaixo e
                siga as intruções para enviar o comprovante do pagamento.
              </Text>

              <Flex p="24px" my="8px" width="100%">
                <Text
                  width="100%"
                  whiteSpace="pre-wrap"
                  fontSize="14px"
                  dangerouslySetInnerHTML={{
                    __html: order.payment_method.data
                  }}
                />
              </Flex>

              <Flex
                width="100%"
                fontSize="16px"
                justifyContent="center"
                textTransform="uppercase"
              >
                <Text>Valor a ser depositado: </Text>
                <Text ml="8px" color="black">
                  {NumberUtils.toCurrency(order.total_value)}
                </Text>
              </Flex>

              {uploadedFile.progress < 100 && (
                <Flex width="100%" flexDirection="column" mt="16px" mb="32px">
                  <Flex width="100%" flexDirection="column">
                    <Text color="blue.700" fontSize="14px">
                      ANEXAR COMPROVANTE
                    </Text>

                    <Dropzone
                      accept={['image/*', 'application/pdf']}
                      onDropAccepted={handleUpload}
                    >
                      {({
                        getRootProps,
                        getInputProps,
                        isDragActive,
                        isDragReject
                      }) => (
                        <Flex
                          width="100%"
                          flexDirection="column"
                          alignItems="center"
                          mr="16px"
                          {...getRootProps()}
                          outline="none"
                        >
                          <input {...getInputProps()} />
                          <Box
                            mt="4px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            border="2px dashed"
                            borderColor="gray.600"
                            width="100%"
                            py="8px"
                            _hover={{
                              cursor: 'pointer'
                            }}
                          >
                            {!isDragActive && !isDragReject && (
                              <>
                                <BiCloudUpload size={40} />
                                <Text fontSize="14px" mt="4px">
                                  Arraste ou clique aqui
                                </Text>
                              </>
                            )}

                            {isDragActive && !isDragReject && (
                              <Flex
                                flexDirection="column"
                                color="green.500"
                                alignItems="center"
                              >
                                <FiCheck size={40} />
                                <Text fontSize="14px" mt="4px">
                                  Solte o arquivo aqui
                                </Text>
                              </Flex>
                            )}

                            {isDragReject && (
                              <Flex
                                flexDirection="column"
                                color="pink.500"
                                alignItems="center"
                              >
                                <FiAlertTriangle size={40} />
                                <Text fontSize="14px" mt="4px">
                                  Arquivo não suportado apenas PNG JPG ou PDF
                                </Text>
                              </Flex>
                            )}
                          </Box>
                        </Flex>
                      )}
                    </Dropzone>

                    <Text color="red.500" fontSize="12px">
                      Atenção apenas fotos ou arquivos em PDF
                    </Text>
                  </Flex>
                </Flex>
              )}
            </Flex>
          )}

          {(order.payment_method.type === 'CREDITCARD' ||
            uploadedFile.progress === 100) && (
            <Flex
              fontSize="14px"
              textAlign="center"
              mt="24px"
              flexDirection="column"
            >
              <Box
                mt="8px"
                backgroundColor="green.500"
                height="40px"
                display="flex"
                color="white"
                fontWeight="500"
                px="16px"
                borderRadius="4px"
                whiteSpace="pre"
                alignItems="center"
                justifyContent="center"
                onClick={() => {
                  window.location.href = '/acompanhar-meu-pedido';
                }}
                cursor="pointer"
              >
                <Text fontSize="16px">ACOMPANHAR SEU PEDIDO</Text>
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    )
  );
};

export default CheckoutLastPage;
