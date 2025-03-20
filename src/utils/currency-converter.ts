export default function currencyConverter(value: number | string) {
  if (typeof value !== 'number') {
    Number(value);
  }

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
