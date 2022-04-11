import vars from './output.module.scss';

export type Colors = 'primary' | 'success' | 'error';
export type TextTypes = 'heading1' | 'label' | 'input';
export enum Speeds {
  FAST = 150,
  NORMAL = 250,
  SLOW = 350,
}

// Used for knobs
export const variables = Object.entries<string>(vars).reduce<{
  [prop in keyof typeof vars]: ReturnType<JSON['parse']>;
}>((acc, info) => {
  acc[info[0]] = JSON.parse(info[1].replace(/(^'*|'*$)/g, ''));
  return acc;
}, {});
