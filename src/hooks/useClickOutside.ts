import { MutableRefObject, useEffect, useRef } from 'react';
type ElementLike = HTMLElement | null;

/**
 * Runs callback when click is outside of all references [Ideal for popups]
 * @param {MutatableRefObject<Element | Element[]>} ref - React Ref with element or list of elements to check for
 * @param {function} action - The callback that gets executed when cliked outside of all reference(s)
 * @param {boolean} [skip=false] - Disables click outside when true
 */
export function useClickOutside<T extends ElementLike | ElementLike[]>(
  ref: MutableRefObject<T extends (infer E)[] ? E : T>,
  action: () => void,
  skip = false,
) {
  const _action = useRef(action);
  useEffect(() => {
    if (skip) return;
    const handler = (event: MouseEvent) => {
      const elements = [ref.current].flat();
      if (
        !elements.some((element) => element?.contains(event.target as Node))
      ) {
        _action.current?.();
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, [skip]);
}
