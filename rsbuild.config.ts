import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSvgr({
      mixedImport: true,
    }),
  ],
  html: {
    template: './public/index.html',
  },
  output: {
    distPath: {
      root: 'build',
    },
  },
  server: {
      proxy: {
        '/dev-proxy-api': {
          target: 'https://api.keeper.or.kr',
          changeOrigin: true,
          pathRewrite: {
            '^/dev-proxy-api': '',
          },
          cookieDomainRewrite: '',
        },
      },
    },
});
