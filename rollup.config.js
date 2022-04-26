import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';

const packageJson = require('./package.json');
const isDev = process.env.NODE_ENV === 'development';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        name: packageJson.name.split('/').pop(),
        file: packageJson.main,
        sourcemap: true,
        format: 'cjs',
      },
      {
        file: packageJson.module,
        sourcemap: true,
        format: 'esm',
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        minimize: !isDev,
        modules: isDev || {
          generateScopedName: 'ui_[hash:base64:4]',
        },
      }),
      copy({
        targets: [
          {
            src: './src/styles/**/*',
            dest: './dist/styles',
          },
          {
            src: './assets/**/*',
            dest: './dist/assets',
          },
        ],
      }),
      !isDev && terser(),
    ].filter(Boolean),
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
