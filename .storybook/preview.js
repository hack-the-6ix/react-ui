import React from 'react';
import { StyleProvider } from '../src/components';
import './index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  viewMode: 'docs',
  backgrounds: {
    default: 'dark-blue',
    values: [
      {
        name: "white",
        value: "#FFFFFF"
      },
      {
        name: 'dark-blue',
        value: "#010F29"
      }
    ]
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [(Story) => <StyleProvider>{Story()}</StyleProvider>];
