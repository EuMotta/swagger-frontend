type DateFormatOptions = {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'short' | 'long';
  hour12?: boolean;
};

/**
 * Formata uma data para uma string no formato especificado.
 *
 * @function formatDate
 * @param {string} date - Data a ser formatada.
 * @param {string} [locale='pt-BR'] - Localização para a formatação da data.
 * @param {DateFormatOptions} [options] - Opções de formatação da data.
 * @returns {string} Data formatada ou mensagem de erro.
 *
 * @example
 * // Retorna "25 de jan de 2023"
 * formatDate("2023-01-25 14:30:00");
 *
 * @example
 * // Retorna "25/01/2023"
 * formatDate("25/01/2023");
 *
 * @example
 * // Retorna "25 de janeiro de 2023, 14:30"
 * formatDate("2023-01-25T14:30:00", "pt-BR", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
 */
export default function formatDate(
  date: string,
  locale = 'pt-BR',
  options: DateFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
) {
  if (!date) return 'Data não disponível';

  try {
    let parsedDate: Date;

    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) {
      const isoDate = date.replace(' ', 'T') + 'Z';
      parsedDate = new Date(isoDate);
    } else if (!date.includes('T')) {
      const [day, month, year] = date.split('/').map(Number);
      parsedDate = new Date(year, month - 1, day);
    } else {
      parsedDate = new Date(date);
    }

    return parsedDate.toLocaleDateString(locale, options);
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
}
