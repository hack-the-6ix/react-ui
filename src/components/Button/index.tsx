import { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import cx from 'classnames';
import { Typography } from '..';
import styles from './Button.module.scss';
import { Colors } from '../../styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  icon?: {
    placement: 'left' | 'center' | 'right';
    element: ElementType;
  };
  disabled?: boolean;
  variant?: 'solid';
  color?: Colors;
}

function Button({
  color = 'primary-1',
  variant = 'solid',
  className,
  children,
  icon,
  ...props
}: ButtonProps) {
  return (
    <Typography
      {...props}
      className={cx(
        variant && styles[`variant--${variant}`],
        styles[`color--${color}`],
        styles.base,
        className,
      )}
      textType='paragraph1'
      as='button'
    >
      {icon?.placement === 'left' && (
        <span>
          <icon.element />
        </span>
      )}
      <span>{icon?.placement === 'center' ? <icon.element /> : children}</span>
      {icon?.placement === 'right' && (
        <span>
          <icon.element />
        </span>
      )}
    </Typography>
  );
}

export default Button;
