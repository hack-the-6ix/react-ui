import React, {InputHTMLAttributes, ReactNode, useRef, useState} from 'react';
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
  /** Hides Icon in Input Field (Only visually) */
  hideIcon?: InputLayoutProps['hideIcon'];
  /** Icon in Input Field */
  emptyIcon?: ReactNode,
  filledIcon?: ReactNode,
  manageFilledIconOpacity?: boolean
}

function Input({
  outlineColor = 'shades-0',
  className,
  hideLabel,
  status,
  label,
  labelColor,
  name,
  assistiveText,
  assistiveTextColor,
  hideAssistiveText,
  hideIcon,
  emptyIcon,
  filledIcon,
  manageFilledIconOpacity = true,
  ...props
}: InputProps) {
  if (status?.state) outlineColor = (status?.state === 'error' ? 'error-500' : 'success');

  const [textState, setTextState] = useState(false);

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
      <div className={cx(styles['input-container'], manageFilledIconOpacity && styles['manage-opacity'], textState && styles['has-content'])}>
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTextState(!!event.target.value);
                props.onChange?.(event);
              }}>
        </Typography>
        {!textState && emptyIcon}
        {textState && filledIcon}
      </div>
    </InputLayout>
  );
}

export default Input;
