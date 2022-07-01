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
    statusState: {
      control: {
        type: 'radio',
        options: ['error', 'success'],
      },
    },
    statusText: {
      control: {
        type: 'text',
      },
    },
  },
};

interface StoryProps extends InputProps {
  statusState: 'error' | 'success';
  statusText: string;
}

export const DefaultStory = ({
  statusState,
  statusText,
  ...args
}: StoryProps) => (
  <Input {...args} status={{ state: statusState, text: statusText }} />
);
DefaultStory.args = {
  label: 'This is a label uwu',
};
