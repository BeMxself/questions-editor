module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  configureWebpack: {
    plugins: process.env.NODE_ENV === 'production' ? [] : [],
    resolve: {},
    externals: process.env.NODE_ENV === 'production' ? { vue: 'Vue' } : {},
  },
}
