import Dropdown from '.';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

export const DefaultStory = () => (
  <Dropdown
    onChange={(event) => console.log(event.currentTarget.value)}
    placeholder='Dropdown'
    label='Dropdown'
    name='dropdown'
    value=''
    options={[
      {
        label: 'owo',
        value: 1,
      },
    ]}
  />
);
