const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const ViewModel = require('./models/message')
const { serverConfig } = require('../config')
const { formatDate } = require('../utils/format-date')

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
        console.log({ ...new ViewModel(response.payload) })
        return h.view('home', { ...new ViewModel(response.payload) })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
