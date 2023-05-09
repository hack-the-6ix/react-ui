import cx from 'classnames';
import Typography from '../Typography';
import { TextTypes } from '../../styles';
import styles from './Link.module.scss';
import {ComponentWithAs} from "../../types";

export type LinkProps = ComponentWithAs<{
    className?: string;
    underline?: boolean; // 0 - no underline; 1 - underlined
    isDisabled?: boolean; // 0 - not disabled; 1- disabled
    textType: TextTypes;
}>;

function Link({
    as: Component = 'a',
    textType,
    className,
    isDisabled,
    underline,
    children,
    ...props
}: LinkProps) {
    let textColor = "warning-400";
    let fontWeight = 600;

    underline = underline ?? false;

    return (
        <Typography
            className={cx(className)}
            textType={textType}
            textColor={textColor}
            fontWeight={fontWeight}
        >
            <Component {...props} className={cx(styles.link, isDisabled && styles.disabledLink)} {...underline? {style: {textDecoration: "underline"}} : {style: {textDecoration: 'none'}}}>
                    {children}
            </Component>
        </Typography>
        
    );
    
}

export default Link;
