import React, {InputHTMLAttributes} from 'react';
import cx from 'classnames';
import { Typography, InputLayout, InputLayoutProps } from '..';
import { Colors } from '../../styles';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** The default color of the input border */
  outlineColor?: Colors;
  /** Opacity from 0 to 100, 0 being transparent and 100 being opaque */
  opacity?: number,
  /** Opacity from 0 to 100 when the input component is focused, 0 being transparent and 100 being opaque */
  opacityOnHover?: number,
  /** Removes border */
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
  opacity = 100,
  opacityOnHover = 100,
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

  const style = {
    "--input-opacity": (opacity / 100),
    "--input-opacity-on-hover": (opacityOnHover / 100)
  } as React.CSSProperties;

  return (
    <div style={style}>
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
              (opacity !== 100 && opacityOnHover !== 100) && styles[`translucent`],
              noBorder && styles.noborder,
              placeHolderColor && styles[`placeholdercolor--${placeHolderColor}`],
              textColor && styles[`textcolor--${textColor}`],
          )}
          placeholder={label}
          name={name}
          {...props}/>
    </InputLayout>
    </div>
  );
}

export default Input;
