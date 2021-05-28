import { formatRelative, parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

export default class DateUtils {
  static formatRelative(date1: Date, date2: Date): string {
    const formatRelativeLocale: any = {
      lastWeek: "'Última Semana'",
      yesterday: "'Ontem'",
      today: "'Hoje'",
      tomorrow: "'Amanhã'",
      nextWeek: "dd 'de' LLLL",
      other: "dd 'de' LLLL"
    };

    return formatRelative(date1, date2, {
      locale: {
        ...ptBR,
        formatRelative: token => formatRelativeLocale[token]
      }
    });
  }

  static format = (value: any, mask = 'dd/MM/yyyy'): string => {
    return format(parseISO(value), mask, {
      timeZone: 'America/Sao_Paulo'
    });
  };
}
