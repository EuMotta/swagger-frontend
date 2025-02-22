import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * @function useIsMobile
 * @summary Hook para determinar se o dispositivo é móvel.
 *
 * Este hook utiliza a API de matchMedia para monitorar a largura da janela e retorna um valor booleano que indica se a largura atual é menor que o breakpoint definido.
 *
 * @returns {boolean} Retorna true se a largura da janela for menor que o breakpoint móvel; caso contrário, false.
 */

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
