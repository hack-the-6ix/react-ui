import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { Typography } from '..';
import cx from 'classnames';
import styles from './Checkbox.module.scss';
import { Colors } from '../../styles';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  color?: Colors;
  name: string;
}

function Checkbox({
  /** The color of the checkbox **/
  color = 'copy-dark',
  /** Label appearing to the right of the checkbox **/
  label,
  name,
  className,
  children,
  ...props
}: CheckboxProps) {
  return (
    <Typography
      as='label'
      textType='subheading'
      textColor='copy-dark'
      className={cx(styles.container, className)}
    >
      <input
        {...props}
        name={name}
        type='checkbox'
        className={styles.hiddenCheckbox}
      />
      <span className={cx(styles.checkbox, styles[`color--${color}`])}></span>
      {label}
    </Typography>
  );
}

export default Checkbox;
