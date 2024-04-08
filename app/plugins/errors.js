const { handle401 } = require('ffc-auth')

module.exports = {
  plugin: {
    name: 'error-pages',
    register: (server, options) => {
      server.ext('onPreResponse', (request, h) => {
        const response = request.response

        if (response.isBoom) {
          const statusCode = response.output.statusCode

          if (statusCode === 401) {
            return handle401(request, h)
          }

          if (statusCode === 403) {
            return h.view('403').code(statusCode)
          }

          if (statusCode === 404) {
            return h.view('404').code(statusCode)
          }

          request.log('error', {
            statusCode,
            data: response.data,
            message: response.message,
            stack: response.stack
          })

          return h.view('500').code(statusCode)
        }
        return h.continue
      })
    }
  }
}
