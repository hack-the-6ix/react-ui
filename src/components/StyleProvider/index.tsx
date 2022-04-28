import { ReactNode, useEffect, createContext, useContext } from 'react';

const StyleContext = createContext({});
export function useStyleContext() {
  return useContext(StyleContext);
}

export interface StyleProviderProps {
  /** The things to render, most likely the whole entire application itself */
  children: ReactNode;
}
function StyleProvider({ children }: StyleProviderProps) {
  useEffect(() => {
    window.addEventListener(
      'load',
      () => {
        window.requestAnimationFrame(() => {
          window.document.documentElement.classList.add('animate');
        });
      },
      { once: true }
    );

    // Fallback for safari
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.document.documentElement.classList.add('animate');
      });
    }, 500);
  }, []);

  return <StyleContext.Provider value={{}}>{children}</StyleContext.Provider>;
}

export default StyleProvider;
