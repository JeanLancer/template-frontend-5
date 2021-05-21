export default class NumberUtils {
  static toCurrency(value: any, currency = 'BRL'): string {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency
    }).format(value);
  }
}
