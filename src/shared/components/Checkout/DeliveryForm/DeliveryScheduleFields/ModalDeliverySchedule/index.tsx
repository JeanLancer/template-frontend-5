import React, { useCallback, useMemo, useState } from 'react';

import {
  Text,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Flex,
  RadioGroup,
  Stack,
  Radio,
  useToast
} from '@chakra-ui/react';

import { DayModifiers } from 'react-day-picker';
import Calander from '../../../../Form/Calander';
import DateUtils from '../../../../../utils/DateUtils';
import { useCart } from '../../../../../hooks/cart';
import config from '../../../../../config';

interface ModalDeliveryScheduleProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScheduleSettings {
  disabled: {
    daysOfWeek: number[];
    specificDays: Date[];
  };

  anticipationHourLimit: number;
}

const ModalDeliverySchedule: React.FC<ModalDeliveryScheduleProps> = ({
  isOpen,
  onClose
}) => {
  const { handleChangeCartForm } = useCart();
  const toast = useToast();

  const today = useMemo(() => {
    return new Date();
  }, []);

  const [deliveryDate, setDeliveryDate] = useState<Date>(null as any);
  const [deliveryHour, setDeliveryHour] = useState<string>(null as any);

  const [scheduleSettings] = useState<ScheduleSettings>({
    disabled: {
      daysOfWeek: [],
      specificDays: []
    },

    anticipationHourLimit: 2
  });

  const handleDateChange = useCallback(
    (date: Date, modifiers: DayModifiers) => {
      if (!modifiers.disabled) {
        setDeliveryDate(date);
      }
    },
    []
  );

  const checkIfHourIsAvailable = useCallback(
    (maximumShiftTime: number): boolean => {
      const predictedHours =
        today.getHours() + scheduleSettings.anticipationHourLimit;

      return !!(
        deliveryDate.getDate() === today.getDate() &&
        predictedHours > maximumShiftTime
      );
    },
    [deliveryDate, scheduleSettings, today]
  );

  const handleClickConfirm = useCallback(() => {
    if (!deliveryDate || !deliveryHour) {
      toast({
        title: 'Agende sua entrega',
        description: 'Informe a data e o turno da entrega',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom'
      });
    } else {
      handleChangeCartForm('deliverySchedule', {
        deliveryDate,
        deliveryHour
      });

      onClose();
    }
  }, [deliveryDate, deliveryHour, toast, handleChangeCartForm, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      size="lg"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb="8px" borderRadius="2px" mx="8px">
        <ModalHeader fontWeight="500">
          <Text fontSize="14px" textTransform="uppercase">
            Agendar Entrega
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            width="100%"
            flexDirection={['column', 'column', 'row']}
            justifyContent="space-between"
          >
            <Flex
              width={['100%', '100%', '48%']}
              flexDirection="column"
              mb={['24px', '24px', '0px']}
            >
              <Calander
                isErrored={false}
                selectedDate={deliveryDate}
                handleDateChange={handleDateChange}
                handleMonthChange={() => null}
                disabledDaysOfWeek={scheduleSettings.disabled.daysOfWeek}
                disabledSpecificDays={scheduleSettings.disabled.specificDays}
              />

              <Flex
                width="100%"
                alignItems="center"
                flexDirection="column"
                mt="8px"
              >
                <Text fontSize="12px">Legendas:</Text>

                <Flex flexDirection="row" fontSize="10px">
                  <Flex alignItems="center" mr="8px">
                    <Flex
                      width="12px"
                      height="12px"
                      backgroundColor="gray.200"
                      borderRadius="2px"
                      mr="4px"
                    />

                    <Text>Indisponível</Text>
                  </Flex>

                  <Flex mr="8px" alignItems="center">
                    <Flex
                      width="12px"
                      height="12px"
                      backgroundColor="green.500"
                      borderRadius="2px"
                      mr="4px"
                    />

                    <Text>Disponível</Text>
                  </Flex>

                  <Flex alignItems="center">
                    <Flex
                      width="12px"
                      height="12px"
                      backgroundColor="blue.500"
                      borderRadius="2px"
                      mr="4px"
                    />

                    <Text>Selecionado</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            {deliveryDate && (
              <Flex width={['100%', '100%', '48%']} flexDirection="column">
                <Flex width="100%" flexDirection="column">
                  <Text fontSize="14px" fontWeight="500">
                    Selecione o turno de entrega
                  </Text>

                  <RadioGroup
                    defaultValue={deliveryHour}
                    mt="24px"
                    _focus={{
                      border: 'none',
                      outline: 'none'
                    }}
                    onChange={value => setDeliveryHour(value)}
                  >
                    <Stack spacing={1} direction="column">
                      <Radio
                        colorScheme="green"
                        value="Manhã"
                        isDisabled={checkIfHourIsAvailable(12)}
                      >
                        <Text fontSize="12px">
                          Manhã - entrega entre 8h até 12h
                        </Text>
                      </Radio>
                      <Radio
                        colorScheme="green"
                        value="Tarde"
                        isDisabled={checkIfHourIsAvailable(18)}
                      >
                        <Text fontSize="12px">
                          Tarde - entrega entre 13h até 18h
                        </Text>
                      </Radio>

                      {config.ENABLE_NIGHT_TURN && (
                        <Radio
                          colorScheme="green"
                          value="Noite"
                          isDisabled={checkIfHourIsAvailable(20)}
                        >
                          <Text fontSize="12px">
                            Noite - entrega entre 18h até 20h
                          </Text>
                        </Radio>
                      )}
                    </Stack>
                  </RadioGroup>

                  <Flex width="100%" flexDirection="column" mt="48px">
                    {deliveryDate && deliveryHour && (
                      <Flex
                        px="8px"
                        py="4px"
                        border="2px solid"
                        borderColor="yellow.500"
                        backgroundColor="yellow.100"
                        fontSize="12px"
                        flexDirection="column"
                      >
                        <Text fontWeight="400">Entrega agendada para:</Text>

                        <Text fontWeight="500">
                          {`${DateUtils.formatRelative(
                            deliveryDate,
                            today
                          )} - ${deliveryHour}`}
                        </Text>
                      </Flex>
                    )}

                    <Flex
                      width="100%"
                      backgroundColor="green.500"
                      fontSize="12px"
                      justifyContent="center"
                      color="white"
                      py="8px"
                      borderRadius="2px"
                      mt="8px"
                      textTransform="uppercase"
                      cursor="pointer"
                      fontWeight="500"
                      boxShadow="0 1px 3px rgba(0,0,0,0.12)"
                      onClick={() => handleClickConfirm()}
                    >
                      <Text>Confirmar Agendamento</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeliverySchedule;
