import cx from 'classnames';
import { Colors, TextTypes } from '../../styles';
import { ComponentWithAs } from '../../types';
import styles from './Typography.module.scss';

const defaultProps: { [type in TextTypes]?: Partial<TypographyProps> } = {
  heading1: {},
};

export type TypographyProps = ComponentWithAs<{
  /** Font weight */
  textWeight?: 'normal' | 'bold';
  /** Type of text based on theme */
  textType: TextTypes;
  /** Colors based on theme */
  textColor?: Colors;
  className?: string;
}>;
function Typopgrahy(_props: TypographyProps) {
  const {
    as: Component = 'span',
    className,
    textWeight,
    textColor,
    textType,
    ...props
  } = { ...(defaultProps[_props.textType] ?? {}), ..._props };

  return (
    <Component
      {...props}
      className={cx(
        textWeight && styles[`weight--${textWeight}`],
        textColor && styles[`color--${textColor}`],
        textType && styles[`type--${textType}`],
        styles.text,
        className
      )}
    />
  );
}

export default Typopgrahy;
