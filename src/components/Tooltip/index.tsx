import React, {
  RefObject,
  PropsWithChildren,
  useEffect,
  useState,
  CSSProperties,
} from 'react';
import cx from 'classnames';
import styles from './Tooltip.module.scss';
import Portal from '../Portal';

export interface TooltipProps {
  hidden: boolean;
  target: RefObject<HTMLElement | null>;
  position: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  // on: keyof HTMLElementEventMap;
}

function Tooltip({
  target,
  hidden,
  position = 'bottom',
  children,
  className,
}: PropsWithChildren<TooltipProps>) {
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [bottom, setBottom] = useState<number>(0);
  const [right, setRight] = useState<number>(0);

  function updatePosition() {
    if (target.current) {
      const { top, left, bottom, right } =
        target.current.getBoundingClientRect();

      setTop(top + window.scrollY);
      setLeft(left + window.scrollX);
      setBottom(bottom + window.scrollY);
      setRight(right + window.scrollX);
    }
  }

  useEffect(() => {
    updatePosition();
  }, [target]);

  useEffect(() => {
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('click', updatePosition);
  }, []);

  return hidden ? null : (
    <Portal>
      <div
        className={cx(
          styles.tooltip,
          styles['position--' + position],
          className,
        )}
        style={
          {
            '--top': top + 'px',
            '--left': left + 'px',
            '--bottom': bottom + 'px',
            '--right': right + 'px',
          } as CSSProperties
        }
      >
        {children}
      </div>
    </Portal>
  );
}

export default Tooltip;
