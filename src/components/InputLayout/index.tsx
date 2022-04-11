import { ReactNode } from 'react';
import { Typography } from '..';
import cx from 'classnames';
import styles from './InputLayout.module.scss';

export interface InputLayoutProps {
  children: ReactNode;
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
  label,
  status,
  children,
  name,
  required,
  ...props
}: InputLayoutProps) {
  return (
    <div {...props} className={cx(styles.container, className)}>
      {
        <Typography as='label' textType='label' htmlFor={name}>
          <span>{label}</span>
          <span className={styles.star}>{required ? '*' : ''}</span>
        </Typography>
      }
      {children}
      {status?.text && (
        <Typography as='label' textType='label' textColor={status.state}>
          {status.text}
        </Typography>
      )}
    </div>
  );
}

export default InputLayout;
