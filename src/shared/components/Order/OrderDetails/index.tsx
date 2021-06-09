import { Box, Divider, Flex, Text, Image, useToast } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { BiCloudUpload } from 'react-icons/bi';
import { FiAlertTriangle, FiCheck } from 'react-icons/fi';
import { HTTP_RESPONSE } from '../../../constants';
import { apiEflorista } from '../../../services/apiGateway';
import DateUtils from '../../../utils/DateUtils';
import NumberUtils from '../../../utils/NumberUtils';
import TextUtils from '../../../utils/TextUtils';

interface OrderDetailsProps {
  order: any;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
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

            apiEflorista.get(`/orders/details/${order.code}`).then(() => {
              window.scrollTo(0, 0);
            });
          } else {
            toast({
              title: 'Ocorreu um problema',
              description: 'Não foi possível anexar o comprovante.',
              status: 'success',
              duration: 4000,
              isClosable: true
            });

            console.log('caiu aqui');
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
    <Flex width="100%" maxWidth="600px" flexDirection="column" p="16px">
      {order.payment_status === 'AGUARDANDO_COMPROVANTE' && (
        <Flex width="100%" flexDirection="column" mt="16px" mb="32px">
          <Flex width="100%" flexDirection="column" mt="48px">
            <Text color="blue.700">ANEXAR COMPROVANTE</Text>

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

      <Flex width="100%" height="100%" backgroundColor="white">
        <Flex
          flexWrap="wrap"
          border="2px dashed"
          borderColor="gray.700"
          p="16px"
        >
          <Flex width="100%" justifyContent="space-between">
            <Flex width="70%" flexDirection="column" fontSize="14px">
              <Text as="h1" color="blue.700" fontSize="16px" mb="8px">
                {`Pedido - ${order.code}`}
              </Text>
              <Text />
              <Text>{`Forma de Pagamento: ${order.payment_method.name}`}</Text>
              <Flex>
                <Text mr="8px">Status de Pagamento:</Text>
                <Text color="blue.500" fontWeight="500">
                  {TextUtils.convertStatusPayment(order.payment_status)}
                </Text>
              </Flex>

              <Flex>
                <Text mr="8px">Status de Entrega:</Text>
                <Text color="purple.500" fontWeight="500">
                  {TextUtils.convertDeliveryStatus(order.delivery_status)}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Divider width="100%" my="16px" />

          <Flex width="100%">
            <Flex width="100%" flexDirection="column" fontSize="14px">
              <Text color="blue.700" fontSize="16px" mb="8px">
                Dados de Entrega
              </Text>

              <Text>{`Cidade: ${order.delivery_address.city}`}</Text>
              <Text>{`Bairro: ${order.delivery_address.neighborhood}`}</Text>
              <Text>{`Rua: ${order.delivery_address.street}, ${order.delivery_address.number}`}</Text>
              <Text>
                {`Complemento: ${
                  order.delivery_address.complement
                    ? order.delivery_address.complement
                    : 'Não informado'
                }`}
              </Text>

              <Flex mt="24px">
                <Text mr="8px">Data de Entrega: </Text>
                <Text>{DateUtils.format(order.delivery_date)}</Text>
              </Flex>

              <Flex>
                <Text mr="8px">Hora: </Text>
                <Text>{order.delivery_hour}</Text>
              </Flex>

              <Text color="black" fontSize="16px" mt="24px">
                {`Obs: ${order.details.observations || 'Não informada'}`}
              </Text>
            </Flex>

            <Flex width="50%" flexDirection="column" fontSize="14px">
              <Text color="blue.700" fontSize="16px" mb="8px">
                Dados do Destinatário
              </Text>
              <Text>
                {`Nome: ${
                  order.details.destinatary_name
                    ? order.details.destinatary_name
                    : 'Não informado'
                }`}
              </Text>
              {`Telefone: ${
                order.details.destinatary_telephone
                  ? order.details.destinatary_telephone
                  : 'Não informado'
              }`}
            </Flex>
          </Flex>

          <Divider width="100%" my="16px" />

          <Flex width="100%" flexDirection="column">
            <Flex width="100%" justifyContent="space-between" fontSize="14px">
              <Flex width="100%" justifyContent="center" maxWidth="56px">
                <Text>Foto</Text>
              </Flex>
              <Flex width="100%" justifyContent="center">
                <Text>Nome</Text>
              </Flex>
              <Flex width="100%" justifyContent="center" maxWidth="80px">
                <Text>QTD</Text>
              </Flex>
              <Flex width="100%" justifyContent="center" maxWidth="104px">
                <Text>Total Item</Text>
              </Flex>
            </Flex>
            <Divider width="100%" my="4px" />

            {order.products.map((product: any) => (
              <Flex key={product.id} width="100%" flexDirection="column">
                <Flex
                  width="100%"
                  justifyContent="space-between"
                  fontSize="12px"
                  alignItems="center"
                >
                  <Flex width="100%" justifyContent="center" maxWidth="56px">
                    <Image src={product.cover.thumb_url} />
                  </Flex>
                  <Flex width="100%" justifyContent="center">
                    <Text>{product.name}</Text>
                  </Flex>
                  <Flex width="100%" justifyContent="center" maxWidth="80px">
                    <Text>{product.quantity}</Text>
                  </Flex>

                  <Flex width="100%" justifyContent="center" maxWidth="104px">
                    <Text>
                      {product.is_promotional
                        ? NumberUtils.toCurrency(
                            Number(product.price_promotional) *
                              Number(product.quantity)
                          )
                        : NumberUtils.toCurrency(
                            Number(product.price_sale) *
                              Number(product.quantity)
                          )}
                    </Text>
                  </Flex>
                </Flex>

                <Divider width="100%" my="2px" />
              </Flex>
            ))}
          </Flex>

          <Flex width="100%" mt="24px">
            <Flex width="100%" flexDirection="column">
              <Text color="blue.700" fontSize="16px" mb="8px">
                Menssagem a ser impressa no cartão
              </Text>
              <Text fontSize="14px">
                {order.details.card_message
                  ? order.details.card_message
                  : 'Não informada'}
              </Text>
            </Flex>
          </Flex>
          <Flex
            width="100%"
            mt="24px"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Flex
              width="200px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="14px">Total de Produtos:</Text>
              <Text fontSize="16px">
                {NumberUtils.toCurrency(order.products_value)}
              </Text>
            </Flex>
            <Flex
              width="200px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="14px">Entrega:</Text>
              <Text fontSize="16px">
                {NumberUtils.toCurrency(order.delivery_value)}
              </Text>
            </Flex>

            <Flex
              width="200px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="14px">Taxa:</Text>
              <Text fontSize="16px">
                {NumberUtils.toCurrency(order.tax_value)}
              </Text>
            </Flex>

            <Flex
              width="200px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="14px">Desconto:</Text>
              <Text fontSize="16px">
                {`- ${NumberUtils.toCurrency(order.discount_value)}`}
              </Text>
            </Flex>
            <Flex
              width="200px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="18px" mr="16px">
                Total:
              </Text>
              <Text fontSize="20px" color="green.500">
                {NumberUtils.toCurrency(order.total_value)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OrderDetails;
