import { InputLayout, InputLayoutProps, Typography } from '..';
import { HTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Textarea.module.scss';

export interface TextareaProps
  extends HTMLAttributes<HTMLTextAreaElement>,
    Omit<InputLayoutProps, 'children' | 'status'> {
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
      name={props.name}
      label={label}
      labelTextType='heading4'
    >
      <Typography
        {...props}
        className={cx(
          overLimit ? styles[`outline--error`] : styles[`outline--copy-dark`],
          styles.field,
        )}
        textType='paragraph1'
        as='textarea'
      />
      {limit && (
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
