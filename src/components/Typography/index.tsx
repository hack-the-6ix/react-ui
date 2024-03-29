import cx from 'classnames';
import { forwardRef } from 'react';
import { Colors, TextTypes } from '../../styles';
import { ComponentWithAs } from '../../types';
import styles from './Typography.module.scss';

export type TypographyProps = ComponentWithAs<{
  /** Font weight */
  textWeight?: number;
  /** Type of text based on theme */
  textType: TextTypes;
  /** Colors based on theme */
  textColor?: Colors;
  /** Name of the class */
  className?: string;
}>;

const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      as: Component = 'span',
      className,
      textWeight,
      textColor,
      textType,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        {...props}
        style={{
          '--typo-weight': textWeight,
        }}
        className={cx(
          textColor && styles[`color--${textColor}`],
          textType && styles[`type--${textType}`],
          textWeight && styles[`with-weight`],
          styles.text,
          className,
        )}
        ref={ref}
      />
    );
  },
);

export default Typography;
