module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: process.env.NODE_ENV !== 'production' ? ['react-refresh/babel'] : []
}
