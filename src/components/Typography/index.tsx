import cx from 'classnames';
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
  className?: string;
}>;
function Typopgrahy({
  as: Component = 'span',
  className,
  textWeight,
  textColor,
  textType,
  ...props
}: TypographyProps) {
  return (
    <Component
      {...props}
      style={{
        '--typo-weight': textWeight,
        '--typo-color': textColor && `var(--${textColor})`,
      }}
      className={cx(
        textType && styles[`type--${textType}`],
        textWeight && styles[`with-weight`],
        textColor && styles[`with-color`],
        styles.text,
        className
      )}
    />
  );
}

export default Typopgrahy;
