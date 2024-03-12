const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

module.exports = {
  method: GET,
  path: '/',
  options: {
    handler: async (request, h) => {
      try {
        const messages = await Wreck.get(
          `${serverConfig.messagesHost}/messages`, {
            json: true
          }
        )
        console.log(messages.payload)
        return h.view('home')
      } catch (err) {
        console.error(err)
      }
    }
  }
}
