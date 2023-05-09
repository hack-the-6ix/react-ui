import BasicLink, { BasicLinkProps } from '.';

export default {
    title: 'Components/BasicLink',
    component: BasicLink,
    argTypes: {
        className: {
            control: {
                type: 'text',
            },
        }
    },
};

export const DefaultStory = (args: BasicLinkProps) => <BasicLink {...args} />;
DefaultStory.args = {
    children: 'Sample text more uwu',
    href: 'https://www.google.com',
    linkStyle: 'styled'
}