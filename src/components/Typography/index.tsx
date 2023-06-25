import cx from 'classnames';
import { forwardRef } from 'react';
import { Colors, TextTypes, Weights, DisplayTypes } from '../../styles';
import { ComponentWithAs } from '../../types';
import styles from './Typography.module.scss';

export type TypographyProps = ComponentWithAs<{
  /** Font weight */
  textWeight: Weights;
  /** Type of text based on theme */
  textType: TextTypes;
  /** Display type */
  displayType: DisplayTypes;
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
      displayType,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        {...props}
        className={cx(
          textColor && styles[`color--${textColor}`],
          textType &&
            styles[
              `type--${
                textType.charAt(0) == 'p'
                  ? textType
                  : `${textType}-${displayType}`
              }`
            ],
          textWeight && styles[`weight--${textWeight}`],
          styles.text,
          className,
        )}
        ref={ref}
      />
    );
  },
);

export default Typography;
