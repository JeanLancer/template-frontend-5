import { Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useData } from '../../../../hooks/data';

const Info: React.FC = () => {
  const data = useData();

  const TEXT = useCallback(() => {
    if (data.info) {
      const weekDayHours = data.info.weekday_hours.split('|');
      const weekendHours = data.info.weekend_hour.split('|');

      if (data.info.days_of_service === 'MON_FRY') {
        return (
          <Text>
            {`Atendimento de seg. a sex. das ${
              weekDayHours[0].split(':')[0]
            }h ás ${weekDayHours[1].split(':')[0]}h`}
          </Text>
        );
      }

      if (data.info.days_of_service === 'MON_SAT') {
        return (
          <Text>
            {`Atendimento de seg. a sex. das ${
              weekDayHours[0].split(':')[0]
            }h ás ${weekDayHours[1].split(':')[0]}h e sáb. das ${
              weekendHours[0].split(':')[0]
            }h ás ${weekendHours[1].split(':')[0]}h`}
          </Text>
        );
      }

      return (
        <Text>
          {`Atendimento de seg. a sex. das ${
            weekDayHours[0].split(':')[0]
          }h ás ${weekDayHours[1].split(':')[0]}h e aos sáb. e dom. das ${
            weekendHours[0].split(':')[0]
          }h ás ${weekendHours[1].split(':')[0]}h`}
        </Text>
      );
    }

    return <></>;
  }, [data]);

  return <TEXT />;
};

export default Info;
