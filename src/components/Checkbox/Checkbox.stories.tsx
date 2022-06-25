import Checkbox from '.';
import { Typography } from '..';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

export const DefaultStory = () => (
  <Checkbox
    defaultChecked
    onChange={(evt) => console.log(evt.target.checked)}
    color='success'
    label={
      <Typography textType='heading1' textColor='success' textWeight='normal'>
        Lorem Ipsum Dolor sit Amet
      </Typography>
    }
  />
);
