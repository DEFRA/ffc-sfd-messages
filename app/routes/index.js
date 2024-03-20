const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

module.exports = {
  method: GET,
  path: '/',
  options: {
    handler: async (request, h) => {
      try {
        const response = await Wreck.get(
          `${serverConfig.messagesHost}/messages`,
          {
            json: true
          }
        )
        console.log('Payload: ', response.payload)
        return h.view('home', { messages: response.payload })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
