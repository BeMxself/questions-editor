import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import requireContext from 'rollup-plugin-require-context'
import visualizer from 'rollup-plugin-visualizer'
import alias from '@rollup/plugin-alias'
import path from 'path'

import postcss from 'rollup-plugin-postcss'
import less from 'rollup-plugin-less'

const config = {
  input: 'src/index.js', // 必须，入口文件
  external: [
    'regenerator-runtime',
    'vue',
    'vuex',
    'html2canvas',
    'jspdf',
    'tree-like-object-utils',
    'vue-draggable-resizable-gorkys',
  ],
  output: {
    format: 'es',
    dir: 'dist',
    globals: {
      vue: 'Vue', // 告诉rollup全局变量Vue即是vue
    },
  },
  plugins: [
    // 引入的插件在这里配置
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
      ],
    }),
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json', '.vue'],
      browser: true,
    }),
    requireContext(),
    less(),
    postcss({ extensions: ['.css'] }),
    vue({
      css: true,
      compileTemplate: true,
      preprocessStyles: true,
      normalizer: '~vue-runtime-helpers/dist/normalize-component.js',
    }),
    babel({
      externalHelpers: true,
      runtimeHelpers: true,
      exclude: '**/node_modules/**',
      extensions: ['.js', '.vue'],
      presets: [
        [
          '@vue/cli-plugin-babel/preset',
          {
            targets: {
              browsers: ['> 1%'],
            },
            modules: false,
            useBuiltIns: false,
            // debug: true,
          },
        ],
      ],
      plugins: [
        // ['@babel/plugin-transform-runtime', { corejs: 3 }],
        // '@babel/plugin-external-helpers',
        // '@babel/plugin-syntax-dynamic-import',
      ],
    }),
    commonjs(),
    visualizer(),
  ],
}

export default config
