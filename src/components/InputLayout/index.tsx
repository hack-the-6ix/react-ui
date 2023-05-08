import { ElementType, ReactNode } from 'react';
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
  hideIcon?: boolean;
  icon?: {
    placement: 'default' | 'filled';
    element: ElementType;
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
  assistiveText,
  hideAssistiveText,
  hideIcon,
  icon,
  ...props
}: InputLayoutProps) {
  let textColor = 'neutral-50';
  if (disabled) {
    // TODO: 'neutral-50' with 38% opacity for Disabled State on entire component
    textColor = 'neutral-50';
  } else if (status?.state === 'error') {
    textColor = 'error-500';
  } else if (status?.state === 'success') {
    textColor = 'success';
  }
  return (
    <div {...props} className={cx(styles.container, className)}>
      <Typography
        className={cx(hideLabel && styles['hide-label'], styles.label)}
        as='label'
        textType='paragraph2'
        textColor='neutral-50'
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
          textColor={status.state ?? 'neutral-900'}
        >
          {status.text}
        </Typography>
      )}
      <Typography
        className={cx(hideAssistiveText && styles['hide-assistive-text'], styles.assistiveText)}
        as='assistiveText'
        textType='paragraph3'
        textColor={textColor}
        htmlFor={name}
      >
        {assistiveText}
      </Typography>
    </div>
  );
}

export default InputLayout;
