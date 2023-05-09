import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';
import { Typography } from '..';
import { Colors } from '../../styles';
import styles from './Button.module.scss';
import { ComponentWithAs } from '../../types';

interface _ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  buttonVariant?: 'primary' | 'secondary' | 'tertiary';
  buttonColor?: Colors;
  iconOnly?: boolean;
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
  iconOnly = false,
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
        iconOnly && styles['button-icon-only'],
        className,
      )}
      textType='paragraph2'
      textWeight={600}
      as={props.as ?? 'button'}
    >
      {
        icon &&
        <div className={cx(styles['icon-container'], !iconOnly && styles['icon-container-withtext'])}>{icon}</div>
      }
      {!iconOnly && children}
    </Typography>
  );
}

export default Button;
