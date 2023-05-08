import { InputHTMLAttributes, useRef } from 'react';
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
  /** Hides Icon in Input Field (Only visually) */
  hideIcon?: InputLayoutProps['hideIcon'];
  /** Icon in Input Field */
  icon?: InputLayoutProps['icon'];
}

function Input({
  outlineColor = 'shades-0',
  className,
  hideLabel,
  status,
  label,
  name,
  assistiveText,
  hideAssistiveText,
  hideIcon,
  icon,
  ...props
}: InputProps) {
  if (status?.state) outlineColor = (status?.state === 'error' ? 'error-500' : 'success');

  // Icon Display & Interactivity
  let input = document.getElementsByClassName('input');

  // Handling Input Field when empty/filled
  const inputChange = () => {
    if(input.length !== 0) {
      return icon?.placement === 'default';
    } else {
      return icon?.placement === 'filled';
    };
  };
  
  const handleIconFilled = () => {
    // Clear Input Field when x icon (filled) is clicked
    if(input.length !== 0) {
      input.value = "";
    };
  };

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
      hideIcon={hideIcon}
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
        onFocus={inputChange}
      />
      {icon?.placement === 'default' && (
        <span className={styles.iconDefault}>
          <icon.element />
        </span>
      )}
      {icon?.placement === 'filled' && (
        <span className={styles.iconFilled}>
          <icon.element onClick={handleIconFilled} />
        </span>
      )}
    </InputLayout>
  );
}

export default Input;
