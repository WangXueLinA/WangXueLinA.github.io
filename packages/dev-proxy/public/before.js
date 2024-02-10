module.exports = (app) => {
  app.all('*', require('./middlewares'))
}
