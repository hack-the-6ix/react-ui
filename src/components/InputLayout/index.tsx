import { ElementType, ReactNode } from 'react';
import cx from 'classnames';
import { Typography } from '..';
import styles from './InputLayout.module.scss';
import {Colors} from "../../styles";

export interface InputLayoutProps {
  children: ReactNode;
  hideLabel?: boolean;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  label: string;
  labelColor?: Colors;
  name: string;
  status?: {
    state: 'error' | 'success';
    text?: ReactNode;
  };
  assistiveText?: string;
  assistiveTextColor?: Colors;
  hideAssistiveText?: boolean;
}

function InputLayout({
  className,
  hideLabel,
  label,
  labelColor = 'neutral-50',
  status,
  children,
  disabled,
  name,
  required,
  assistiveText,
  assistiveTextColor = 'neutral-50',
  hideAssistiveText,
  ...props
}: InputLayoutProps) {
  let textColor;

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
        textWeight={600}
        textColor={textColor ?? labelColor}
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
      {assistiveText &&
          <Typography
              className={cx(hideAssistiveText && styles['hide-assistive-text'], styles.assistiveText)}
              textType='paragraph3'
              textColor={textColor ?? assistiveTextColor}
              textWeight={500}
              htmlFor={name}
          >
            {assistiveText}
          </Typography>}
    </div>
  );
}

export default InputLayout;
