import {
  FocusEvent,
  MouseEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';
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
  backgroundColor: string;
  enableSearch: boolean;
}

function SearchDropdown<T extends DropdownOption>({
  className,
  hideLabel,
  status,
  label,
  options,
  backgroundColor,
  enableSearch,
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

  const filteredOptions = enableSearch ? options.filter((option) => (option.label.startsWith(inputRef.current?.value ?? '') || option.value.startsWith(inputRef.current?.value ?? ''))) : options;

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
            backgroundColor && styles[`color--${backgroundColor}`]
          )}
          style={backgroundColor && !styles[`color--${backgroundColor}`] ? {
            backgroundColor: backgroundColor
          } : {}}
        >
          <div className={styles.display}>
            <Typography
              {...props}
              onFocus={(e: FocusEvent<HTMLInputElement>) => {
                props.onFocus?.(e);
                setShowMenu(true);
              }}
              textType='paragraph2'
              className={cx(styles.input, (showMenu && filteredOptions.length > 0) && styles.expanded)}
              ref={inputRef}
              as='input'
            />
            <RiArrowUpSLine
              className={cx(showMenu && styles.show, styles.caret)}
            />
          </div>
          <div className={cx(
            styles.menuContainer,
            backgroundColor && styles[`color--${backgroundColor}`]
            )}
            style={backgroundColor && !styles[`color--${backgroundColor}`] ? {
              backgroundColor: backgroundColor
            } : {}}>
            <ul className={cx(showMenu && styles.show, styles.menu)}>
              {filteredOptions.map((option, key) => (
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
                        textType='paragraph2'
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
      </div>
    </InputLayout>
  );
}

export default SearchDropdown;
