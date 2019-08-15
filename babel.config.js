module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-runtime',
    'babel-plugin-styled-components',
    'inline-react-svg',
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: 'css'}]
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ],
    '@babel/preset-react'
  ]
}
