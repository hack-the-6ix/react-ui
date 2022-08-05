import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
} from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import cx from 'classnames';
import { formatBytes } from '../../utils';
import { InputLayout, InputLayoutProps, Typography } from '..';
import styles from './FileUpload.module.scss';

export interface FileUploadProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'accept' | 'value' | 'children'
    >,
    Omit<InputLayoutProps, 'children'> {
  value?: FileList | string | null;
  disabled?: boolean;
  accept?: string[];
  name: string;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      accept = ['*'],
      className,
      disabled,
      onChange,
      hideLabel,
      label,
      status,
      value,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const isString = typeof value === 'string';

    if (
      !isString &&
      inputRef.current &&
      value &&
      value !== inputRef.current.files
    ) {
      console.warn(
        'FileInput and value is unsynced. This may inconsistencies between state and UI',
      );
    }

    const file = isString ? value : value?.item?.(0);
    return (
      <InputLayout
        className={cx(
          disabled && styles.disabled,
          file && styles.populated,
          className,
        )}
        disabled={disabled}
        required={props.required}
        hideLabel={hideLabel}
        name={props.name}
        status={status}
        label={label}
      >
        <div className={styles.container}>
          <input
            {...props}
            accept={accept.join(', ')}
            className={styles.input}
            disabled={disabled}
            onChange={onChange}
            ref={inputRef}
            type='file'
          />
          <AiFillFileAdd className={styles.icon} />
          {file ? (
            <div>
              <Typography className={styles.label} textType='heading4' as='p'>
                {isString ? file : (file as File).name}
              </Typography>
              <Typography className={styles.text} textType='paragraph2' as='p'>
                Accepted file format: {accept.join(', ')}
              </Typography>
            </div>
          ) : (
            <div>
              <Typography className={styles.label} textType='heading4' as='p'>
                Drop files here or{' '}
                <span className={styles.linkLike}>Browse</span>
              </Typography>
              <Typography className={styles.text} textType='paragraph2' as='p'>
                Accepted file format: {accept.join(', ')}
              </Typography>
            </div>
          )}
        </div>
      </InputLayout>
    );
  },
);

export default FileUpload;
