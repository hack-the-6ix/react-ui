import { MouseEventHandler, ReactNode, useState } from 'react';
import cx from 'classnames';
import { InputLayout, InputLayoutProps, Button } from '..';
import DropdownMenu from './DropdownMenu';
import styles from './Dropdown.module.scss';

export interface DropdownItem {
  label: ReactNode;
  value: string | number;
}

export interface DropdownProps<OptionType extends DropdownItem = DropdownItem>
  extends Omit<InputLayoutProps, 'children'> {
  renderOption?: (option: OptionType, idx: number) => ReactNode;
  onChange: MouseEventHandler<HTMLButtonElement>;
  options: OptionType[];
  placeholder: string;
  usePortal?: boolean;
  value: string;
}

function Dropdown<OptionType extends DropdownItem>({
  renderOption = (option: OptionType) => option.label,
  placeholder,
  usePortal,
  onChange,
  options,
  value,
  ...props
}: DropdownProps<OptionType>) {
  const [showDropdown, setShowDropdown] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <InputLayout {...props}>
      <div className={styles.trigger}>
        <select className={styles.select} defaultValue=''>
          <option disabled hidden value=''>
            {placeholder}
          </option>
          {options.map((option, key) => (
            <option value={option.value} key={key}>
              {option.label}
            </option>
          ))}
        </select>
        <Button onClick={() => setShowDropdown(!showDropdown)} tabIndex={-1}>
          {selectedOption?.label ?? placeholder}
        </Button>
      </div>
      {showDropdown && (
        <DropdownMenu
          className={cx(usePortal && styles.portalMenu)}
          renderOption={renderOption}
          usePortal={usePortal}
          onChange={onChange}
          options={options}
        />
      )}
    </InputLayout>
  );
}

export default Dropdown;
