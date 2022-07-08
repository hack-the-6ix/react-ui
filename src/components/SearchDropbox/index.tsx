import {
  FocusEvent,
  MouseEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import cx from 'classnames';
import InputLayout, { InputLayoutProps } from '../InputLayout';
import { DropdownOption } from '../Dropdown';
import Typography from '../Typography';
import { useClickOutside } from '../../hooks';
import { Speeds } from '../../styles';
import styles from './SearchDropdown.module.scss';

export interface SearchDropdownProps<T extends DropdownOption>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>,
    Omit<InputLayoutProps, 'children'> {
  options: T[];
}

function SearchDropdown<T extends DropdownOption>({
  className,
  placeholder,
  hideLabel,
  status,
  label,
  options,
  ...props
}: SearchDropdownProps<T>) {
  const selectedOption = options.find((option) => option.value === props.value);
  const [delayedShow, setDelayedShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const action = () => setDelayedShow(showMenu);
    if (showMenu) return action();

    const timer = window.setTimeout(action, Speeds.NORMAL);
    return () => window.clearTimeout(timer);
  }, [showMenu]);

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
      <div
        ref={parentRef}
        className={cx(styles.container, delayedShow && styles.show)}
      >
        <div
          className={cx(
            styles.custom,
            props.disabled && styles.disabled,
            status && styles[status.state],
          )}
        >
          <div className={styles.display}>
            <Typography
              {...props}
              onFocus={(e: FocusEvent<HTMLInputElement>) => {
                props.onFocus?.(e);
                setShowMenu(true);
              }}
              textType='paragraph1'
              className={styles.input}
              ref={inputRef}
              as='input'
            />
            <AiFillCaretDown
              className={cx(showMenu && styles.show, styles.caret)}
            />
          </div>
          <ul className={cx(showMenu && styles.show, styles.menu)}>
            {options.map((option, key) => (
              <li key={key}>
                <Typography
                  tabIndex={showMenu ? undefined : -1}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    if (!inputRef.current) return;
                    props.onChange?.({
                      ...e,
                      currentTarget: {
                        ...inputRef.current,
                        value: option.value,
                      },
                      target: {
                        ...inputRef.current,
                        value: option.value,
                      },
                    } as any);
                  }}
                  disabled={props.disabled}
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

export default SearchDropdown;
