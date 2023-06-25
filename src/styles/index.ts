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
    'neutral-50',
    'neutral-100',
    'neutral-200',
    'neutral-300',
    'neutral-400',
    'neutral-500',
    'neutral-600',
    'neutral-700',
    'neutral-800',
    'neutral-900',
    'primary-50',
    'primary-200',
    'primary-500',
    'primary-600',
    'primary-700',
    'warning-50',
    'warning-200',
    'warning-400',
    'shades-0',
    'shades-100',
    'copy-dark',
    'copy-light',
    'success',
    'error-500',
    'error-600',
    'disabled-light',
    'disabled-dark',
    'grey',
  ] as const,
  textTypes: [
    'display',
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'heading5',
    'heading6',
    'paragraph-lg',
    'paragraph-md',
    'paragraph-sm',
    'paragraph-xs'
  ] as const,
  displayTypes: [
    'desktop',
    'mobile'
  ] as const,
  weights: [
    'regular',
    'medium',
    'semi-bold',
    'bold',
    'extra-bold'
  ] as const,
  speeds: {
    FAST: 150,
    NORMAL: 250,
    SLOW: 350,
  } as const,
};

export type Colors = typeof variables['colors'][number];
export type TextTypes = typeof variables['textTypes'][number];
export type DisplayTypes = typeof variables['displayTypes'][number];
export type Weights = typeof variables['weights'][number];
export enum Speeds {
  FAST = variables.speeds.FAST,
  NORMAL = variables.speeds.NORMAL,
  SLOW = variables.speeds.SLOW,
}
