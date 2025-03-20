import * as chrono from 'chrono-node';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Mapeamento de meses abreviados em pt-BR para seus equivalentes em inglês.
 *
 * @constant {Record<string, string>}
 */
const monthMap: Record<string, string> = {
  jan: 'january',
  fev: 'february',
  mar: 'march',
  abr: 'april',
  mai: 'may',
  jun: 'june',
  jul: 'july',
  ago: 'august',
  set: 'september',
  out: 'october',
  nov: 'november',
  dez: 'december',
};

/**
 * Transforma uma string de data com meses abreviados em pt-BR para a versão em inglês.
 *
 * @function transformDateToEnglish
 * @param {string} date - Data no formato com meses abreviados em pt-BR.
 * @returns {string} Data com os meses convertidos para o equivalente em inglês.
 */
function transformDateToEnglish(date: string): string {
  return date.replace(
    /\b(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\b/gi,
    (match) => monthMap[match.toLowerCase()],
  );
}

/**
 * Gera uma string formatada a partir de um objeto Date.
 *
 * @function generateDateString
 * @param {Date} date - Objeto Date a ser formatado.
 * @param {boolean} [includeTime=true] - Indica se a hora deve ser incluída na formatação.
 * @returns {string} Data formatada no padrão pt-BR.
 *
 * @example
 * // Retorna "25 jan 2023, 14:30"
 * generateDateString(new Date("2023-01-25T14:30:00"));
 *
 * @example
 * // Retorna "2023-01-25"
 * generateDateString(new Date("2023-01-25T14:30:00"), false);
 */
export function generateDateString(
  date: Date,
  includeTime: boolean = true,
): string {
  return includeTime
    ? format(date, 'dd MMM yyyy, HH:mm', { locale: ptBR })
    : format(date, 'yyyy-MM-dd', { locale: ptBR });
}

/**
 * Interpreta uma string de data com meses e dias abreviados em pt-BR.
 *
 * @function generateDate
 * @param {string} date - Data no formato com meses abreviados em pt-BR.
 * @returns {(Date | null)} Objeto Date interpretado ou null se a data não puder ser analisada.
 */
export function generateDate(date: string): Date | null {
  const transformedDate = transformDateToEnglish(date);
  return chrono.parseDate(transformedDate);
}

/**
 * Expressão regular para validar datas no formato pt-BR com meses abreviados.
 *
 * @constant {RegExp}
 */
const dateFormatRegex =
  /^(\d{1,2})\s(de\s)?(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\s\d{4},\s([0-1]?\d|2[0-3]):[0-5]\d$/;

/**
 * Valida se a string de data está no formato esperado (pt-BR abreviado).
 *
 * @function isValidDateFormat
 * @param {string} dateString - String de data a ser validada.
 * @returns {boolean} True se o formato da data for válido, caso contrário false.
 */
export function isValidDateFormat(dateString: string): boolean {
  return dateFormatRegex.test(dateString);
}
