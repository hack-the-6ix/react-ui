import { InputLayout, InputLayoutProps, Typography } from '..';
import { TextareaHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Textarea.module.scss';
export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'value'>,
    Omit<InputLayoutProps, 'children'> {
  limit?: number;
  value?: string;
}

function countWords(str?: string) {
  return str?.split(/\s+/).filter((c: string) => c != '').length ?? 0;
}

function Textarea({
  hideLabel,
  label,
  className,
  status,
  limit,
  ...props
}: TextareaProps) {
  const count = countWords(props.value);
  const overLimit = limit ? count > limit : false;

  return (
    <InputLayout
      required={props.required}
      hideLabel={hideLabel}
      className={className}
      disabled={props.disabled}
      name={props.name}
      status={status}
      label={label}
    >
      <Typography
        {...props}
        className={cx(
          overLimit ? styles[`outline--error`] : styles[`outline--copy-dark`],
          status && styles[status.state],
          styles.field,
        )}
        textType='paragraph1'
        as='textarea'
      />
      {limit && !status?.text && (
        <Typography
          textColor={overLimit ? 'error' : 'disabled-dark'}
          className={styles.text}
          textType='paragraph1'
        >
          {count}/{limit} words
        </Typography>
      )}
    </InputLayout>
  );
}

export default Textarea;
