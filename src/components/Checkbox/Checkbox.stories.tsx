import Checkbox from '.';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

export const DefaultStory = () => (
  <Checkbox
    defaultChecked
    onChange={(evt) => console.log(evt.target.checked)}
    color='success'
    label={<p>Lorem Ipsum Dolor Sit Amet</p>}
  />
);
