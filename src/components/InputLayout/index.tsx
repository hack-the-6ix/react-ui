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
  name,
  required,
  ...props
}: InputLayoutProps) {
  return (
    <div {...props} className={cx(styles.container, className)}>
      <Typography
        className={cx(hideLabel && styles['hide-label'])}
        as='label'
        textType='heading4'
        textColor='primary-3'
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
