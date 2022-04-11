import { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import { Typography } from '..';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: {
    placement: 'left' | 'center' | 'right';
    element: ElementType;
  };
  disabled?: boolean;
  variant?: 'test';
}

function Button({ icon, children, ...props }: ButtonProps) {
  return (
    <Typography {...props} as='button' textType='input'>
      {icon?.placement === 'left' && (
        <span>
          <icon.element />
        </span>
      )}
      <span>{icon?.placement === 'center' ? <icon.element /> : children}</span>
      {icon?.placement === 'right' && (
        <span>
          <icon.element />
        </span>
      )}
    </Typography>
  );
}

export default Button;
