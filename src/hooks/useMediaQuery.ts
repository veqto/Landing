'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Media query reactiva y segura en SSR.
 *
 * El snapshot de servidor devuelve `false`, así que el primer render (y el
 * HTML estático) siempre asume "no coincide". Los efectos que dependen de
 * esto — parallax, hover lift — solo animan `transform`, de modo que
 * activarse tras la hidratación no produce ningún salto de layout.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onStoreChange);
      return () => list.removeEventListener('change', onStoreChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
