import { ReactNode, useEffect, createContext, useContext } from 'react';

const StyleContext = createContext({});
export function useStyleContext() {
  return useContext(StyleContext);
}

export interface StyleProviderProps {
  /** The things to render, most likely the whole entire application itself */
  children: ReactNode;
  /** Inject global styles */
  injectStyles: Boolean | string;
}
function StyleProvider({ injectStyles, children }: StyleProviderProps) {
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
  }, []);

  useEffect(() => {
    if (!injectStyles) return;
    if (typeof injectStyles === 'boolean') {
      injectStyles = '@ht6/react-ui/dist/styles/index.css';
    }
    import(injectStyles as string);
  }, [ injectStyles ]);

  return <StyleContext.Provider value={{}}>{children}</StyleContext.Provider>;
}

export default StyleProvider;
