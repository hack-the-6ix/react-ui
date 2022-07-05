import { SelectHTMLAttributes, useEffect, useRef, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import cx from 'classnames';
import InputLayout, { InputLayoutProps } from '../InputLayout';
import Typography from '../Typography';
import styles from './Dropdown.module.scss';
import { useClickOutside } from '../../hooks';
import { Speeds } from '../../styles';

export type DropdownOption = {
  label: string;
  value: string;
};

export interface DropdownProps<T extends DropdownOption>
  extends Omit<
      SelectHTMLAttributes<HTMLSelectElement>,
      'name' | 'children' | 'multiple'
    >,
    Omit<InputLayoutProps, 'children'> {
  options: T[];
}

function Dropdown<T extends DropdownOption>({
  className,
  placeholder,
  hideLabel,
  status,
  label,
  options,
  ...props
}: DropdownProps<T>) {
  const selectedOption = options.find((option) => option.value === props.value);
  const [delayedShow, setDelayedShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const action = () => setDelayedShow(showMenu);
    if (showMenu) return action();

    const timer = window.setTimeout(action, Speeds.NORMAL);
    return () => window.clearTimeout(timer);
  }, [ showMenu ]);

  useClickOutside(
    parentRef,
    () => {
      setShowMenu(false);
    },
    !showMenu,
  );

  return (
    <InputLayout
      required={props.required}
      disabled={props.disabled}
      hideLabel={hideLabel}
      className={className}
      name={props.name}
      status={status}
      label={label}
    >
      <div ref={parentRef} className={cx(styles.container, delayedShow && styles.show)}>
        <Typography
          {...props}
          textType='paragraph1'
          className={styles.select}
          ref={selectRef}
          as='select'
        >
          {placeholder && (
            <option selected disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((optionProps, key) => (
            <option {...optionProps} key={key} />
          ))}
        </Typography>
        <div className={cx(styles.custom, props.disabled && styles.disabled)}>
          <Typography
            onClick={() => setShowMenu(!showMenu)}
            className={styles.button}
            disabled={props.disabled}
            textType='paragraph1'
            tabIndex={-1}
            type='button'
            as='button'
          >
            <span className={cx(selectedOption || styles.placeholder)}>
              {selectedOption?.label ?? placeholder ?? 'Select an option'}
            </span>
            <AiFillCaretDown
              className={cx(showMenu && styles.show, styles.caret)}
            />
          </Typography>
          <ul className={cx(showMenu && styles.show, styles.menu)}>
            {options.map((option, key) => (
              <li key={key}>
                <Typography
                  tabIndex={showMenu ? undefined : -1}
                  onClick={() => {
                    if (!selectRef.current) return;
                    selectRef.current.value = option.value;
                    selectRef.current.dispatchEvent(
                      new Event('change', { bubbles: true }),
                    );
                  }}
                  textType='paragraph1'
                  className={cx(
                    selectedOption === option && styles.selected,
                    styles.item,
                  )}
                  as='button'
                  type='button'
                >
                  {option.label}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </InputLayout>
  );
}

export default Dropdown;
