import { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import cx from 'classnames';
import { Typography } from '..';
import { Colors } from '../../styles';
import styles from './Button.module.scss';
import { ComponentWithAs } from '../../types';

interface _ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  icon?: {
    placement: 'left' | 'center' | 'right';
    element: ElementType;
  };
  disabled?: boolean;
  buttonVariant?: 'primary' | 'secondary' | 'tertiary';
  buttonColor?: Colors;
}

export type ButtonProps = ComponentWithAs<_ButtonProps>;

function Button({
  /** Color of the button */
  buttonColor = 'primary-500',
  /** Type of button */
  buttonVariant = 'primary',
  className,
  children,
  /** For applying icons to the button */
  icon,
  ...props
}: ButtonProps) {
  return (
    <Typography
      {...props}
      className={cx(
        buttonVariant && styles[`variant--${buttonVariant}`],
        props.disabled && styles['disabled'],
        styles[`color--${buttonColor}`],
        styles.base,
        className,
      )}
      textType='paragraph2'
      as={props.as ?? 'button'}
    >
      {icon?.placement === 'left' && (
        <span className={styles.icon}>
          <icon.element />
        </span>
      )}
      <span>{icon?.placement === 'center' ? <icon.element /> : children}</span>
      {icon?.placement === 'right' && (
        <span className={styles.icon}>
          <icon.element />
        </span>
      )}
    </Typography>
  );
}

export default Button;
