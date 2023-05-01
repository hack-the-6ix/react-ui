import { ReactNode } from 'react';
import cx from 'classnames';
import { Typography } from '..';
import styles from './InputLayout.module.scss';

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
  assistiveText: string;
  hideAssistiveText?: boolean;
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
  assistiveText,
  hideAssistiveText,
  ...props
}: InputLayoutProps) {
  let textColor = 'primary-700';
  if (disabled) {
    textColor = 'grey';
  } else if (status?.state) {
    textColor = status?.state;
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
        {required ? <span className={cx(styles['required-star'])}> *</span> : ''}
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
      <Typography
        className={cx(hideAssistiveText && styles['hide-assistive-text'], styles.assistiveText)}
        as='assistiveText'
        textType='paragraph3'
        textColor='neutral-900'
        htmlFor={name}
      >
        {assistiveText}
      </Typography>
    </div>
  );
}

export default InputLayout;
