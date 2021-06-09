import React from 'react';
import DayPicker, { DayPickerProps } from 'react-day-picker';

import { Container } from './styles';

interface IProps extends DayPickerProps {
  selectedDate: Date;
  handleDateChange: any;
  handleMonthChange: any;
  isErrored: boolean;
  disabledDaysOfWeek: number[];
  disabledSpecificDays: Date[];
}

const Calander: React.FC<IProps> = ({
  selectedDate,
  handleDateChange,
  handleMonthChange,
  isErrored = false,
  disabledDaysOfWeek,
  disabledSpecificDays
}) => (
  <Container isErrored={isErrored}>
    <DayPicker
      weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
      fromMonth={new Date()}
      disabledDays={[
        {
          before: new Date()
        },
        {
          daysOfWeek: disabledDaysOfWeek
        },
        ...disabledSpecificDays
      ]}
      fixedWeeks
      onMonthChange={handleMonthChange}
      selectedDays={selectedDate}
      onDayClick={handleDateChange}
      months={[
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ]}
    />
  </Container>
);

export default Calander;
