import Textarea, { TextareaProps } from '.';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    className: {
      control: {
        disable: true,
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    hideLabel: {
      control: {
        type: 'boolean',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const DefaultStory = (args: TextareaProps) => <Textarea {...args} />;

DefaultStory.args = {
  label: 'This is a label uwu',
  hideLabel: false,
};
