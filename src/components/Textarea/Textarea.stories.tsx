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
    status: {
      control: {
        disable: true,
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

interface StoryProps extends TextareaProps {
  statusState: 'error' | 'success';
  statusText: string;
}

export const DefaultStory = ({
  statusState,
  statusText,
  ...args
}: StoryProps) => (
  <Textarea {...args} status={{ state: statusState, text: statusText }} />
);

DefaultStory.args = {
  label: 'This is a label uwu',
  hideLabel: false,
};
