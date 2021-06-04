import Parser from 'react-html-parser';

export default class TextUtils {
  static maskTelephone(value: string): string {
    const mask = `(${value.substring(0, 2)}) ${value.substring(
      2,
      7
    )}-${value.substring(7, 11)}`;

    return mask;
  }

  static maskCPF(value: string): string {
    const mask = `${value.substring(0, 3)}.${value.substring(
      3,
      6
    )}.${value.substring(6, 9)}-${value.substring(9, 11)}`;

    return mask;
  }

  static convertStatusPayment(status: string) {
    switch (status) {
      case 'AGUARDANDO_COMPROVANTE':
        return 'AGUARDANDO COMPROVANTE';

      case 'COMPROVANTE_EM_ANALISE':
        return 'COMPROVANTE ENVIADO';

      case 'AGUARDANDO_PAGAMENTO':
        return 'AGUARDANDO PAGAMENTO';

      case 'APROVADO':
        return 'APROVADO';

      case 'CANCELADO':
        return 'CANCELADO';

      case 'EXTORNADO':
        return 'EXTORNADO';
      default:
        return 'NEGADO';
    }
  }

  static convertDeliveryStatus(status: string) {
    switch (status) {
      case 'EM_PRODUCAO':
        return 'EM PRODUÇÃO';

      case 'AGUARDANDO_PAGAMENTO':
        return 'AGUARDANDO PAGAMENTO';

      case 'ENTREGUE':
        return 'ENTREGUE';

      case 'SAIU_PARA_ENTREGA':
        return 'SAIU PARA ENTREGA';

      default:
        return 'AGUARDANDO';
    }
  }

  static mask(value: string, mask = '##.###.###/####-##'): string {
    let valueMasked = mask;

    for (let i = 0; i < value.length; i += 1) {
      valueMasked = valueMasked.replace('#', value[i]);
    }

    const finalValue = valueMasked.replace(/#([^\\s]*)/g, '');

    return value.length === 0 ? value : finalValue;
  }

  static clearHTMLString = (escapedHTML: string): any => Parser(escapedHTML);
}
