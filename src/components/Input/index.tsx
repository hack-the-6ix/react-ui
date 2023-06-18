import React, {InputHTMLAttributes} from 'react';
import cx from 'classnames';
import { Typography, InputLayout, InputLayoutProps } from '..';
import { Colors } from '../../styles';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** The default color of the input border */
  outlineColor?: Colors;
  /** Sets the background to be translucent (2023 website figma) */
  translucentBackground?: boolean,
  /** Removes border (2023 website figma) */
  noBorder?: boolean,
  /** Changes the color of placeholder text */
  placeHolderColor?: Colors,
  /** Changes the color of typed text */
  textColor?: Colors,
  /** Hides label of input (Only visually) */
  hideLabel?: InputLayoutProps['hideLabel'];
  /** For setting success/error states */
  status?: InputLayoutProps['status'];
  /** The label of the input and placeholder (if not provided) */
  label: InputLayoutProps['label'];
  labelColor?: InputLayoutProps['labelColor'],
  /** Name of form input */
  name: InputLayoutProps['name'];
  /** The name of the class */
  className?: string;
  /** Assistive/Descriptive Text below input field **/
  assistiveText?: InputLayoutProps['assistiveText'];
  assistiveTextColor?: InputLayoutProps['assistiveTextColor'];
  /** Hides Assistive/Descriptive Text of input (Only visually) */
  hideAssistiveText?: InputLayoutProps['hideAssistiveText'];
}

function Input({
  outlineColor = 'shades-0',
  translucentBackground = false,
  noBorder = false,
  placeHolderColor,
  textColor,
  className,
  hideLabel,
  status,
  label,
  labelColor,
  name,
  assistiveText,
  assistiveTextColor,
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
      labelColor={labelColor}
      name={name}
      assistiveText={assistiveText}
      assistiveTextColor={assistiveTextColor}
      hideAssistiveText={hideAssistiveText}
    >
      <Typography
          textType='paragraph2'
          as='input'
          className={cx(
              outlineColor && styles[`outline--${outlineColor}`],
              styles.input,
              translucentBackground && styles.translucent,
              noBorder && styles.noborder,
              placeHolderColor && styles[`placeholdercolor--${placeHolderColor}`],
              textColor && styles[`textcolor--${textColor}`],
          )}
          placeholder={label}
          name={name}
          {...props}/>
    </InputLayout>
  );
}

export default Input;
