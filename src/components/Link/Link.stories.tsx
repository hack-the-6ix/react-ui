import Link, { LinkProps } from '.';

export default {
    title: 'Components/Link',
    component: Link,
    argTypes: {
        className: {
            control: {
                type: 'text',
            },
        },
        linkContent: {
            control: {
                type: 'text',
            },
        },
    },
};

export const DefaultStory = (args: LinkProps) => <Link {...args} />;
DefaultStory.args = {
    linkContent: 'Sample text more uwu',
    destination: 'https://www.google.com',
    textType: 'paragraph1',
    isDisabled: false,
    underline: false,
}