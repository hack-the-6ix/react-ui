import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
} from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import cx from 'classnames';
import { formatBytes } from '../../utils';
import { Typography } from '..';
import styles from './FileUpload.module.scss';

export interface FileUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'accept' | 'value'> {
  value?: FileList | null;
  disabled?: boolean;
  accept?: string[];
  name: string;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ accept = ['*'], className, disabled, onChange, value, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    if (inputRef.current && value && value !== inputRef.current.files) {
      console.warn(
        'FileInput and value is unsynced. This may inconsistencies between state and UI',
      );
    }

    const file = value?.item(0);
    return (
      <div
        className={cx(
          disabled && styles.disabled,
          file && styles.populated,
          styles.container,
          className,
        )}
      >
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
              {file.name}
            </Typography>
            <Typography className={styles.text} textType='paragraph2' as='p'>
              Size: {formatBytes(file.size).join(' ')}
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={styles.label} textType='heading4' as='p'>
              Drop files here or <span className={styles.linkLike}>Browse</span>
            </Typography>
            <Typography className={styles.text} textType='paragraph2' as='p'>
              Accepted file format: {accept.join(', ')}
            </Typography>
          </div>
        )}
      </div>
    );
  },
);

export default FileUpload;
