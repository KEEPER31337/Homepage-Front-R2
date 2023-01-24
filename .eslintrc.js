module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'import/extensions': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['craco.config.ts'] }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
