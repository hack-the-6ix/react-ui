import React from 'react';
import { StyleProvider } from '../src/components';
import './index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  viewMode: 'docs',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [(Story) => <StyleProvider>{Story()}</StyleProvider>];
