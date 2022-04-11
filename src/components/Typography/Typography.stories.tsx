import Typography, { TypographyProps } from '.';

export default {
  title: 'Typography',
  component: Typography,
  argTypes: {
    as: {
      control: {
        disable: true,
      },
    },
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

export const DefaultStory = (args: TypographyProps) => <Typography {...args} />;
DefaultStory.args = {
  children: 'Sample text uwu',
  textType: 'heading1',
};
