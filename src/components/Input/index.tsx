import { InputHTMLAttributes } from 'react';
import cx from 'classnames';
import { Typography, InputLayout, InputLayoutProps } from '..';
import { Colors } from '../../styles';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** The default color of the input border */
  outlineColor?: Colors;
  /** Hides label of input (Only visually) */
  hideLabel?: InputLayoutProps['hideLabel'];
  /** For setting success/error states */
  status?: InputLayoutProps['status'];
  /** The label of the input and placeholder (if not provided) */
  label: InputLayoutProps['label'];
  /** Name of form input */
  name: InputLayoutProps['name'];
  /** The name of the class */
  className?: string;
  /** Assistive/Descriptive Text below input field **/
  assistiveText: InputLayoutProps['assistiveText'];
  /** Hides Assistive/Descriptive Text of input (Only visually) */
  hideAssistiveText?: InputLayoutProps['hideAssistiveText'];
}

function Input({
  outlineColor = 'grey',
  className,
  hideLabel,
  status,
  label,
  name,
  assistiveText,
  hideAssistiveText,
  ...props
}: InputProps) {
  if (status?.state) outlineColor = (status?.state === 'error' ? 'error-500' : 'success');
  return (
    <InputLayout
      required={props.required}
      className={className}
      hideLabel={hideLabel}
      disabled={props.disabled}
      status={status}
      label={label}
      name={name}
      assistiveText={assistiveText}
      hideAssistiveText={hideAssistiveText}
    >
      <Typography
        textType='paragraph2'
        as='input'
        className={cx(
          outlineColor && styles[`outline--${outlineColor}`],
          styles.input,
        )}
        placeholder={label}
        name={name}
        {...props}
      />
    </InputLayout>
  );
}

export default Input;
