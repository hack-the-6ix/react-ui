// import vars from './output.module.scss';

/* export const variables = Object.entries<string>(vars).reduce<{
  [prop in keyof typeof vars]: ReturnType<JSON['parse']>;
}>((acc, info) => {
  acc[info[0]] = JSON.parse(info[1].replace(/(^'*|'*$)/g, ''));
  return acc;
}, {}); */

// I wish scss exports worked, but it's generated at async at runtime so T.T
export const variables = {
  colors: [
    'primary-1',
    'primary-2',
    'primary-3',
    'primary-4',
    'primary-5',
    'secondary-1',
    'secondary-2',
    'secondary-3',
    'secondary-4',
    'secondary-5',
    'copy-dark',
    'copy-light',
    'success',
    'error',
    'disabled-light',
    'disabled-dark',
    'grey',
    'grey-light',
    'grey-dark',
  ] as const,
  textTypes: [
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'subheading',
    'paragraph1',
    'paragraph2',
    'paragraph3',
  ] as const,
  speeds: {
    FAST: 150,
    NORMAL: 250,
    SLOW: 350,
  } as const,
};

export type Colors = typeof variables['colors'][number];
export type TextTypes = typeof variables['textTypes'][number];
export enum Speeds {
  FAST = variables.speeds.FAST,
  NORMAL = variables.speeds.NORMAL,
  SLOW = variables.speeds.SLOW,
}
