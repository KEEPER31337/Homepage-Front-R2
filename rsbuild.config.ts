import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
  plugins: [
    pluginReact({
      reactCompiler: true,
    }),
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
        headers: {
          origin: 'https://api.keeper.or.kr',
        },
        pathRewrite: {
          '^/dev-proxy-api': '',
        },
        cookieDomainRewrite: '',
      },
    },
  },
});
