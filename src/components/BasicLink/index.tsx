import { Colors} from "../../styles";
import { CSSProperties } from 'react';
import cx from 'classnames';
import styles from './BasicLink.module.scss';
import {ComponentWithAs} from "../../types";

export type BasicLinkProps = ComponentWithAs<{
    linkStyle?: 'pure' | 'styled';
    linkColor?: Colors;
}>;

function BasicLink({
    as: Component = 'a',
    linkStyle,
    linkColor = 'primary-500',
    className,
    ...props
 }: BasicLinkProps) {
    const sharedProps = {
        className: cx(
            linkStyle === 'styled' && styles[`color--${linkColor}`],
            styles[linkStyle!],
            className
        ),
        style: {
            '--link-color': `var(${linkColor})`,
        } as CSSProperties,
    };

    return <Component {...props} {...sharedProps} />;
}

export default BasicLink;
