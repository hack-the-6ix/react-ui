import Input, { InputProps } from '.';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    className: {
      control: {
        disable: true,
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
    },
    hideLabel: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    hideAssistiveText: {
      control: {
        type: 'boolean',
      },
    }
  },
};

export const DefaultStory = (args: InputProps) => <Input {...args} />;
DefaultStory.args = {
  label: 'This is a label uwu',
  assistiveText: 'This is an assistive text',
};
