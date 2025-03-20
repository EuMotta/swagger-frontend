/**
 * Gera as iniciais a partir de um nome.
 *
 * @function getInitialsCharacters
 * @param {string} name - Nome completo ou parcial do qual as iniciais serão extraídas.
 * @returns {string} Duas primeiras letras maiúsculas do nome.
 *
 * @example
 * // Retorna "JS"
 * getInitialsCharacters("João Silva");
 *
 * @example
 * // Retorna "A"
 * getInitialsCharacters("Ana");
 *
 * @example
 * // Retorna "MC"
 * getInitialsCharacters("Maria Clara");
 */
export default function getInitialsCharacters(name: string) {
  const splitName = name.split(' ');
  const initials = splitName
    .map((namePart) => namePart.charAt(0))
    .join('')
    .replace(/[^A-Z]/g, '')
    .slice(0, 2)
    .toUpperCase();
  return initials;
}
