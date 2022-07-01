import { ReactNode } from 'react';
import cx from 'classnames';
import { Typography } from '..';
import styles from './InputLayout.module.scss';
import { TextTypes } from '../../styles';

export interface InputLayoutProps {
  children: ReactNode;
  hideLabel?: boolean;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  label: string;
  name: string;
  status?: {
    state: 'error' | 'success';
    text?: ReactNode;
  };
}

function InputLayout({
  className,
  hideLabel,
  label,
  status,
  children,
  disabled,
  name,
  required,
  ...props
}: InputLayoutProps) {
  let textColor = 'primary-3';
  if (disabled) {
    textColor = 'grey';
  } else if (status?.state === 'error') {
    textColor = 'error';
  }
  return (
    <div {...props} className={cx(styles.container, className)}>
      <Typography
        className={cx(hideLabel && styles['hide-label'], styles.label)}
        as='label'
        textType='heading4'
        textColor={textColor}
        htmlFor={name}
      >
        {label}
        {required ? '*' : ''}
      </Typography>
      {children}
      {status?.text && (
        <Typography
          className={styles.status}
          as='span'
          textType='paragraph2'
          textColor={status.state ?? 'grey'}
        >
          {status.text}
        </Typography>
      )}
    </div>
  );
}

export default InputLayout;
