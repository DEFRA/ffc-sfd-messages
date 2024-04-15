const routes = [].concat(
  require('../routes'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/assets'),
  require('../routes/view-message')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
