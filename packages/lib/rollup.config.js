import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import { uglify } from 'rollup-plugin-uglify'
import dts from 'rollup-plugin-dts'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json')

const globals = {
  ...packageJson.devDependencies,
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs', // commonJS
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm', // ES Modules
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'umd',
        sourcemap: true,
        name: 'openseaBulkPurchaser',
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      resolve(),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          exclude: ['./examples/**', './test/**', './typechain/**'],
        },
      }),
      commonjs({
        exclude: 'node_modules',
        ignoreGlobal: true,
      }),
      uglify(),
    ],
    external: Object.keys(globals),
  },
  {
    input: './dts/src/index.d.ts',
    output: [{ file: 'dist/src/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]
