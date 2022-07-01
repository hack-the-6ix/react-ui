import { useState } from 'react';
import Dropdown, { DropdownOption, DropdownProps } from '.';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const DefaultStory = (args: DropdownProps<DropdownOption>) => {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: 300 }}>
      <Dropdown
        {...args}
        onChange={(event) => {
          setValue(event.currentTarget.value);
          console.log(event.currentTarget.value);
        }}
        value={value}
        options={[
          {
            label: 'owo 1',
            value: '1',
          },
          {
            label: 'owo 2',
            value: '2',
          },
          {
            label: 'owo 3',
            value: '3',
          },
          {
            label: 'owo 4',
            value: '4',
          },
          {
            label: 'owo 5',
            value: '5',
          },
        ]}
      />
    </div>
  );
};

DefaultStory.args = {
  label: 'Label owo',
};
