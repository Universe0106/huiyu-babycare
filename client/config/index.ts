import { defineConfig } from '@tarojs/cli'
import devConfig from './dev'
import prodConfig from './prod'

export default defineConfig(async (merge, { command }) => {
  const baseConfig = {
    projectName: 'baby-care',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
      '@tarojs/plugin-framework-react',
      '@tarojs/plugin-platform-weapp',
      '@tarojs/plugin-platform-h5'
    ],
    defineConstants: {},
    framework: 'react',
    compiler: 'webpack5',
    mini: {
      postcss: {
        pxtransform: {
          enable: true
        }
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        }
      }
    }
  }
  if (command === 'build' && process.env.NODE_ENV === 'production') {
    return merge({}, baseConfig, prodConfig)
  }
  return merge({}, baseConfig, devConfig)
})
