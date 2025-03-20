/**
 * Formata um número de documento (CPF ou CNPJ).
 *
 * @function formatDocument
 * @param {string} document - Número do documento a ser formatado (apenas números, sem pontuação).
 * @param {'CPF' | 'CNPJ'} type - Tipo do documento a ser formatado.
 * @returns {string} Documento formatado ou o próprio documento se o tipo for inválido.
 *
 * @example
 * // Retorna "123.456.789-09"
 * formatDocument("12345678909", "CPF");
 *
 * @example
 * // Retorna "12.345.678/0001-99"
 * formatDocument("12345678000199", "CNPJ");
 */
export const formatDocument = (document: string, type: 'CPF' | 'CNPJ') => {
  if (type === 'CPF') {
    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (type === 'CNPJ') {
    return document.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }
  return document;
};
