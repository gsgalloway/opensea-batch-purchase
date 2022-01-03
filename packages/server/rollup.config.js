import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import pluginExternals from 'rollup-plugin-node-externals'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
// import globals from 'rollup-plugin-node-globals'
// import polyfills from 'rollup-plugin-node-polyfills'
// import builtins from 'rollup-plugin-node-builtins'
// import externalGlobals from 'rollup-plugin-external-globals'

/**
 * Add here external dependencies that actually you use.
 */
// const externals = ['cors', 'firebase-functions', 'firebase-admin', 'fs']

export default {
  input: 'src/index.ts',
  //   external: externals,
  external: ['readable-stream', 'readable-stream/transform', 'util'],
  plugins: [
    typescript(),
    pluginExternals({
      // deps: false,
      include: ['electron'],
      // exclude: ['@standard-crypto/opensea-batch-purchaser', 'web3'],
    }),
    // polyfills(),
    alias({
      'readable-stream': 'stream',
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: false,
      preferBuiltins: true,
    }),
    json(),
    replace({
      delimiters: ['', ''],
      values: {
        "require('readable-stream/transform')": "require('stream').Transform",
        'require("readable-stream/transform")': 'require("stream").Transform',
        'readable-stream': 'stream',
      },
    }),
    commonjs({
      include: /node_modules/,
      // exclude: 'node_modules',
      ignoreGlobal: true,
      // strictRequires: true,
      transformMixedEsModules: true,
      namedExports: {
        'node_modules/util/util.js': ['inherits'],
      },
    }),
  ],
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    // globals: {
    //   path: 'path',
    //   fs: 'fs',
    //   os: 'os',
    //   tty: 'tty',
    //   net: 'net',
    //   buffer: 'buffer',
    //   stream: 'stream',
    //   zlib: 'zlib',
    //   http: 'http',
    //   crypto: 'crypto',
    //   child_process: 'child_process',
    //   https: 'https',
    // },
    name: 'api',
    sourcemap: 'inline',
  },
}
