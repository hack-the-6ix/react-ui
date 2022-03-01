import { ComponentPropsWithoutRef, ElementType } from "react";

/*
  Special generic for defining components with dynamic elements
  such that they inherit the props of the underlying element

  Ex.
    # Example usage
    function DynamicElement<T extends ElementType = 'div'>(
      { as, ...props }: ComponentWithAs<T, { banana: string }>,
    ) {
      const Component = as ?? 'div';
      return <Component {...props}/>;
    }

    <DynamicElement
      as='input'        # Infers type based on value of as
      type='number'     # Would provide typing as if an HTMLInputElement
      banana='owo'      # Also extends custom defined props
    />
*/
interface _ComponentWithAs<T extends ElementType> { as?: T };
export type ComponentWithAs<T extends ElementType, Props> = ComponentPropsWithoutRef<T> & _ComponentWithAs<T> & Props;
