const Joi = require('joi')
const { DEVELOPMENT, TEST, PRODUCTION } = require('../constants/environments')

const schema = Joi.object().keys({
  port: Joi.number().default(3005),
  env: Joi.string().valid(DEVELOPMENT, TEST, PRODUCTION).default(DEVELOPMENT),
  serviceName: Joi.string().default('Single Front Door'),
  routePrefix: Joi.string().default('/messages'),
  authHost: Joi.string().required(),
  gatewayHost: Joi.string().required(),
  dataHost: Joi.string().required()
})

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  serviceName: process.env.SERVICE_NAME,
  routePrefix: process.env.ROUTE_PREFIX,
  authHost: process.env.AUTH_HOST,
  gatewayHost: process.env.GATEWAY_HOST,
  dataHost: process.env.DATA_HOST
}

const { error, value } = schema.validate(config)

if (error) {
  throw new Error(`The server config is invalid. ${error.message}`)
}

value.isDev = value.env === DEVELOPMENT

module.exports = value
