import { ReactNode, useEffect, createContext, useContext } from "react";

const StyleContext = createContext({});
export function useStyleContext() {
  return useContext(StyleContext);
}

interface StyleProviderProps {
  children: ReactNode;  
}
function StyleProvider({ children }: StyleProviderProps) {
  useEffect(() => {
    if (!window) return;
    window.addEventListener('load', () => {
      window.requestAnimationFrame(() => {
        window.document.documentElement.classList.add('animate');
      });
    }, { once: true });
  }, []);

  return (
    <StyleContext.Provider value={{}}>
      {children}
    </StyleContext.Provider>
  )
}