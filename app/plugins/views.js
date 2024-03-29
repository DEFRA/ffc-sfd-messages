const path = require('path')
const nunjucks = require('nunjucks')
const { serverConfig } = require('../config')
const { version } = require('../../package.json')

module.exports = {
  plugin: require('@hapi/vision'),
  options: {
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)

          return (context) => {
            return template.render(context)
          }
        },
        prepare: (options, next) => {
          options.compileOptions.environment = nunjucks.configure([
            path.join(options.relativeTo || process.cwd(), ...options.path),
            'app/views',
            'node_modules/govuk-frontend/dist/'
          ], {
            autoescape: true,
            watch: serverConfig.isDev
          })

          return next()
        }
      }
    },
    path: ['../views'],
    relativeTo: __dirname,
    isCached: !serverConfig.isDev,
    context: {
      appVersion: version,
      serviceName: serverConfig.serviceName,
      pageTitle: `${serverConfig.serviceName} - GOV.UK`
    }
  }
}
