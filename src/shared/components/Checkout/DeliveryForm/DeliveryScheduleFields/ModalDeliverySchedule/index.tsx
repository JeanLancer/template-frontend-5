import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
import apiGateway from '../../../../../services/apiGateway';
import { HTTP_RESPONSE } from '../../../../../constants';

interface ModalDeliveryScheduleProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScheduleSettings {
  daysOfService: 'MON_FRY' | 'MON_SAT' | 'MON_SUN';
  weekdayHours: string[];
  weekendHour: string[];
  daysOfWeekEnabled: {
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
  };
  daysDisabled: Date[];

  daysOfWeekDisabledFormatted: number[];
  daysDisabledFormatted: Date[];

  timeSettings: {
    [key: string]: {
      [key: string]: {
        startHour: string;
        endHour: string;
        isActive: boolean;
      };
    };
  };
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

  const DAYS_OF_WEEK = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
  ];

  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(() => {
    return DAYS_OF_WEEK[new Date().getDay()];
  });

  const [scheduleSettings, setScheduleSettings] = useState<ScheduleSettings>(
    null as any
  );

  const handleDateChange = useCallback(
    (date: Date, modifiers: DayModifiers) => {
      if (!modifiers.disabled) {
        setSelectedDayOfWeek(DAYS_OF_WEEK[date.getDay()]);
        setDeliveryDate(date);
      }
    },
    [DAYS_OF_WEEK]
  );

  const checkIfHourIsAvailable = useCallback(
    (hour: string): boolean => {
      const hourLimit = Number(hour.split(':')[0]);

      return !!(
        deliveryDate.getDate() === today.getDate() &&
        today.getHours() >= hourLimit
      );
    },
    [deliveryDate, today]
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

  useEffect(() => {
    apiGateway.get('/checkout/schedule_setting').then(response => {
      if (response.status === HTTP_RESPONSE.STATUS.SUCCESS) {
        const { days_disabled, time_settings } = response.data;

        const daysOfWeekDisabledFormatted: any = Object.keys(time_settings).map(
          key => {
            console.log(time_settings[key].isActive);
            if (time_settings[key].isActive === false) {
              switch (key) {
                case 'SUNDAY':
                  return 0;
                case 'MONDAY':
                  return 1;
                case 'TUESDAY':
                  return 2;
                case 'WEDNESDAY':
                  return 3;
                case 'THURSDAY':
                  return 4;
                case 'FRIDAY':
                  return 5;
                default:
                  return 6;
              }
            }

            return -1;
          }
        );

        const daysDisabledFormatted =
          days_disabled !== ''
            ? days_disabled.split('|').map((item: any) => {
                return new Date(item);
              })
            : [];

        setScheduleSettings({
          ...response.data,
          daysOfWeekDisabledFormatted,
          daysDisabledFormatted,
          timeSettings: time_settings
        });
      }
    });
  }, []);

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
          {scheduleSettings && (
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
                  disabledDaysOfWeek={
                    scheduleSettings.daysOfWeekDisabledFormatted
                  }
                  disabledSpecificDays={scheduleSettings.daysDisabledFormatted}
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
                        {scheduleSettings.timeSettings[selectedDayOfWeek]
                          .MORNING.isActive && (
                          <Radio
                            colorScheme="green"
                            value="Manhã"
                            isDisabled={checkIfHourIsAvailable(
                              scheduleSettings.timeSettings[selectedDayOfWeek]
                                .MORNING.endHour
                            )}
                          >
                            <Text fontSize="12px">
                              {`Manhã - entrega até às ${
                                scheduleSettings.timeSettings[selectedDayOfWeek]
                                  .MORNING.endHour || '12h'
                              }`}
                            </Text>
                          </Radio>
                        )}

                        {scheduleSettings.timeSettings[selectedDayOfWeek]
                          .EVENING.isActive && (
                          <Radio
                            colorScheme="green"
                            value="Tarde"
                            isDisabled={checkIfHourIsAvailable(
                              scheduleSettings.timeSettings[selectedDayOfWeek]
                                .EVENING.startHour
                            )}
                          >
                            <Text fontSize="12px">
                              {`Tarde - entrega até às ${scheduleSettings.timeSettings[selectedDayOfWeek].EVENING.endHour}`}
                            </Text>
                          </Radio>
                        )}

                        {scheduleSettings.timeSettings[selectedDayOfWeek].NIGHT
                          .isActive && (
                          <Radio
                            colorScheme="green"
                            value="Noite"
                            isDisabled={checkIfHourIsAvailable(
                              scheduleSettings.timeSettings[selectedDayOfWeek]
                                .NIGHT.startHour
                            )}
                          >
                            <Text fontSize="12px">
                              {`Noite - entrega até às ${scheduleSettings.timeSettings[selectedDayOfWeek].NIGHT.endHour}`}
                            </Text>
                          </Radio>
                        )}

                        {scheduleSettings.timeSettings[selectedDayOfWeek].UNIQUE
                          .isActive && (
                          <Radio
                            colorScheme="green"
                            value="Integral"
                            isDisabled={checkIfHourIsAvailable(
                              scheduleSettings.timeSettings[selectedDayOfWeek]
                                .UNIQUE.endHour
                            )}
                          >
                            <Text fontSize="12px">
                              {`Integral - entrega das ${scheduleSettings.timeSettings[selectedDayOfWeek].UNIQUE.startHour} até às ${scheduleSettings.timeSettings[selectedDayOfWeek].UNIQUE.endHour}`}
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
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeliverySchedule;
