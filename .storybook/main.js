const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  stories: [
    '../src/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        postcssLoaderOptions: {
          postcssOptions: {
            syntax: 'postcss-scss',
          },
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: isDev
              ? '[name]__[local]--[hash:base64:5]'
              : 'ui_[hash:base64:4]',
            auto: true,
          },
        },
      },
    },
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  staticDirs: [
    '../src/assets/fonts',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
