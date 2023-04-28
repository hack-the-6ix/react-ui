import Button, { ButtonProps } from '.';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    className: {
      control: {
        disable: true,
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
};

export const DefaultStory = (args: ButtonProps) => <Button {...args} />;
DefaultStory.args = {
  children: 'Sample text uwu',
  buttonColor: 'primary-500',
  buttonVariant: 'solid',
};
