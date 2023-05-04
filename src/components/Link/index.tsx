import { ReactNode } from 'react';
import cx from 'classnames';
import Typography from '../Typography';
import { TextTypes } from '../../styles';
import styles from './Link.module.scss';

export interface LinkProps {
    className?: string;
    underline: boolean; // 0 - no underline; 1 - underlined
    destination: string; // where the link should lead to
    linkContent?: ReactNode;
    isDisabled?: boolean; // 0 - not disabled; 1- disabled
    textType: TextTypes;
    target?: '_self' | '_blank' | '_parent' | '_top';
}

function Link({
    linkContent,
    destination,
    textType,
    className,
    target,
    isDisabled,
    underline,
    ...props
}: LinkProps) {
    let textColor = "warning-400";
    let fontWeight = 600; 

    return (
        <Typography
            className={cx(className)}
            textType={textType}
            textColor={textColor}
            fontWeight={fontWeight}
        >
            <a href={destination} target={target?? undefined} className={cx(styles.link, isDisabled && styles.disabledLink)} {...underline? {style: {textDecoration: "underline"}} : {style: {textDecoration: 'none'}}}> 
                    {linkContent?? destination}
            </a>
        </Typography>
        
    );
    
}

export default Link;
