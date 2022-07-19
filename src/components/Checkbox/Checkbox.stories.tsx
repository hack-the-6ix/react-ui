import Checkbox, { CheckboxProps } from '.';
import { Typography } from '..';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    // Override label prop since Storybook controls don't support ReactNodes
    label: {
      control: {
        type: 'text',
      },
    },
    checked: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const DefaultStory = (args: CheckboxProps) => (
  <Checkbox
    {...args}
    onChange={(evt) => console.log(evt.target.checked)}
    label={args.label}
  />
);

DefaultStory.args = {
  label: 'Click me!',
};
