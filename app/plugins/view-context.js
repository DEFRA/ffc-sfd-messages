const { mapAuth } = require('ffc-auth')

module.exports = {
  plugin: {
    name: 'view-context',
    register: (server, _options) => {
      server.ext('onPreResponse', (request, h) => {
        const statusCode = request.response.statusCode
        if (request.response.variety === 'view' && statusCode !== 404 && statusCode !== 500 && request.response.source.manager._context) {
          request.response.source.manager._context.auth = mapAuth(request)
        }
        return h.continue
      })
    }
  }
}
