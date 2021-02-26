module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
      stage: 0
    })
  ]
}
