module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021, // The version of ECMAScript you are using
    sourceType: 'module', // Enables ECMAScript modules
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.tsx', '.json'],
        map: [['@', '.']],
      },
    },
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended', // Specify rules for React
    'plugin:react-hooks/recommended', // Specify rules for React hooks
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    // This is where you can disable/customize some of the rules specified by the plugins
    indent: ['error', 2],
    'no-param-reassign': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': ['off'],
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': ['off'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    semi: 'off',
  },
}
