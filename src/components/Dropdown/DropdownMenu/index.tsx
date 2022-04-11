import { ForwardedRef, forwardRef, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DropdownItem, DropdownProps } from '..';

function renderMenu(template: ReactElement, usePortal?: boolean) {
  if (!window || !usePortal) return template;
  return createPortal(template, window.document.body);
}

interface DropdownMenuProps<OptionType extends DropdownItem>
  extends Pick<
    DropdownProps<OptionType>,
    'renderOption' | 'usePortal' | 'onChange' | 'options'
  > {
  className?: string;
}

function DropdownMenu<OptionType extends DropdownItem>(
  {
    renderOption,
    usePortal,
    className,
    onChange,
    options,
    ...props
  }: DropdownMenuProps<OptionType>,
  ref: ForwardedRef<HTMLUListElement>,
) {
  useEffect(() => {
    if (!usePortal) return;
    const handler = () => {};
    handler();

    window.addEventListener('scroll', handler, true);
    return () => {
      window.removeEventListener('scroll', handler, true);
    };
  }, [usePortal]);

  return renderMenu(
    <ul {...props} className={className} ref={ref}>
      {options.map((option, key) => (
        <li key={key}>
          <button onClick={onChange} value={option.value}>
            {renderOption!(option, key)}
          </button>
        </li>
      ))}
    </ul>,
    usePortal
  );
}

export default forwardRef(DropdownMenu) as <OptionType extends DropdownItem>(
  props: DropdownMenuProps<OptionType>,
  ref: ForwardedRef<HTMLUListElement>,
) => ReturnType<typeof DropdownMenu>;
