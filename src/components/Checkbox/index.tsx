import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { Typography } from '..';
import cx from 'classnames';
import styles from './Checkbox.module.scss';
import { Colors } from '../../styles';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  disabled?: boolean;
  checked?: boolean;
  color?: Colors;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

function Checkbox({
  checked,
  onChange,
  color = 'primary',
  label,
  children,
  ...props
}: CheckboxProps) {
  const [_checked, setChecked] = useState<boolean>(Boolean(checked));

  function _onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
    onChange?.(event);
  }

  return (
    <Typography as='label' textType='input' className={styles.container}>
      <input
        {...props}
        type='checkbox'
        checked={_checked}
        onChange={_onChange}
        className={styles.hidden}
      />
      <span
        className={cx(
          styles.checkbox,
          _checked && styles.checked,
          styles[`color--${color}`]
        )}
      ></span>
      {label}
    </Typography>
  );
}

export default Checkbox;
