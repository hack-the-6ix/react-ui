import React, { InputHTMLAttributes, useState } from 'react';
import { Typography } from '..';
import cx from 'classnames';
import styles from './FileUpload.module.scss';

export interface FileUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'accept'> {
  accept: string[];
  disabled?: boolean;
  value?: File;
  onChange?: (
    file: File | undefined,
    evt: React.ChangeEvent<HTMLInputElement> | React.DragEvent,
  ) => void;
}

function FileUpload({
  accept = ['*'],
  disabled,
  className,
  value,
  onChange,
  ...props
}: FileUploadProps) {
  // Show hover animation when dropping files
  const [hovering, setHovering] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>(value);

  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    const newFile = evt.target.files?.[0];
    setFile(newFile);
    onChange?.(newFile, evt);
  }

  function handleDrop(evt: React.DragEvent) {
    evt.preventDefault();
    const newFile = evt.dataTransfer?.files?.[0];
    setFile(newFile);
    onChange?.(newFile, evt);
  }

  function handleDragOver(evt: React.DragEvent) {
    evt.preventDefault();
    setHovering(true);
  }

  function handleDragLeave(evt: React.DragEvent) {
    evt.preventDefault();
    setHovering(false);
  }

  return (
    <Typography
      as='label'
      textType='heading4'
      textColor={disabled ? 'grey' : 'primary-3'}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onMouseLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cx(
        className,
        styles.container,
        disabled && styles.disabled,
        hovering && styles.hovering,
      )}
    >
      <input
        {...props}
        type='file'
        accept={accept.join(',')}
        disabled={disabled}
        className={styles.input}
        onChange={handleFileChange}
      />
      <svg
        className={styles.icon}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 23 28'
      >
        <path
          fill='currentColor'
          d='M10.4545 16.125H6.92614C6.85682 16.125 6.79034 16.1513 6.74132 16.1982C6.69231 16.2451 6.66477 16.3087 6.66477 16.375V17.875C6.66477 17.9413 6.69231 18.0049 6.74132 18.0518C6.79034 18.0987 6.85682 18.125 6.92614 18.125H10.4545V21.5C10.4545 21.5663 10.4821 21.6299 10.5311 21.6768C10.5801 21.7237 10.6466 21.75 10.7159 21.75H12.2841C12.3534 21.75 12.4199 21.7237 12.4689 21.6768C12.5179 21.6299 12.5455 21.5663 12.5455 21.5V18.125H16.0739C16.1432 18.125 16.2097 18.0987 16.2587 18.0518C16.3077 18.0049 16.3352 17.9413 16.3352 17.875V16.375C16.3352 16.3087 16.3077 16.2451 16.2587 16.1982C16.2097 16.1513 16.1432 16.125 16.0739 16.125H12.5455V12.75C12.5455 12.6837 12.5179 12.6201 12.4689 12.5732C12.4199 12.5263 12.3534 12.5 12.2841 12.5H10.7159C10.6466 12.5 10.5801 12.5263 10.5311 12.5732C10.4821 12.6201 10.4545 12.6837 10.4545 12.75V16.125ZM22.6929 7.02188C22.8889 7.20938 23 7.4625 23 7.72812V27C23 27.5531 22.5328 28 21.9545 28H1.04545C0.467187 28 0 27.5531 0 27V1C0 0.446875 0.467187 0 1.04545 0H14.9206C15.1983 0 15.4662 0.10625 15.6622 0.29375L22.6929 7.02188ZM20.5889 8.1875L14.4403 2.30625V8.1875H20.5889Z'
        />
      </svg>
      {file ? (
        file.name
      ) : (
        <span>
          Drop Files here or{' '}
          <Typography
            textType='heading4'
            textColor={disabled ? 'grey' : 'primary-1'}
            className={styles.underlined}
          >
            Browse
          </Typography>
        </span>
      )}
      <Typography
        textType='paragraph2'
        textColor={disabled ? 'grey' : 'copy-dark'}
      >
        {file ? (
          'Size: ' + (file.size / 1024).toFixed(2) + 'kb'
        ) : (
          <span>
            Accepted file format{accept.length > 1 && 's'}:{' '}
            {accept.map((a) => a.replace('.', '')).join(', ')}
          </span>
        )}
      </Typography>
    </Typography>
  );
}

export default FileUpload;
