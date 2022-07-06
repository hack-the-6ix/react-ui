import { useEffect, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children }: PropsWithChildren<{}>) {
  const wrapper = document.createElement('div');
  useEffect(() => {
    document.body.appendChild(wrapper);
    return () => {
      document.body.removeChild(wrapper);
    };
  });
  return createPortal(children, wrapper);
}

export default Portal;
