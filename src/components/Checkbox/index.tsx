import { InputHTMLAttributes, ReactNode } from 'react';
import { Typography } from '..';
import cx from 'classnames';
import styles from './Checkbox.module.scss';
import { Colors } from '../../styles';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checkboxType?: 'radio' | 'checkbox';
  label?: ReactNode;
  color?: Colors;
  name: string;
  status?: {
    state: 'error' | 'success';
  };
  disabled?: boolean;
}

function Checkbox({
  /** The color of the checkbox **/
  color = 'primary-500',
  /** Label appearing to the right of the checkbox **/
  checkboxType = 'checkbox',
  label,
  name,
  className,
  children,
  status,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <Typography
      as='label'
      textType='subheading'
      textColor={disabled ? 'disabled-dark' : status?.state ?? color}
      className={cx(styles.container, disabled && styles.disabled, className)}
    >
      <div className={cx(styles.box, color && styles[`box--${color}`])}>
        <input
          {...props}
          checked={props.checked ?? Boolean(props.value)}
          disabled={disabled}
          name={name}
          type={checkboxType}
          className={styles.input}
        />
        <svg
          className={styles.checkbox}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 448 512'
        >
          <path
            fill='currentColor'
            d='M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z'
          />
        </svg>
      </div>
      {label}
    </Typography>
  );
}

export default Checkbox;
