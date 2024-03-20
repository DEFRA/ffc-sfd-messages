const { GET } = require('../constants/http-verbs')

module.exports = {
  method: GET,
  path: '/message-view',
  handler: async (request, h) => {
    return h.view('message-view')
  }
}
