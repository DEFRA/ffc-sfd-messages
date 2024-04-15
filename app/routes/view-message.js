const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const { SFD_VIEW } = require('ffc-auth/scopes')
const { formatDate } = require('../utils/format-date')

module.exports = [
  {
    method: GET,
    path: '/view-message/{sbi}/{id}',
    options: {
      auth: { strategy: 'jwt', scope: [SFD_VIEW] },
      handler: async (request, h) => {
        try {
          const notificationSbi = request.params.sbi
          const notificationId = request.params.id
          const response = await Wreck.get(
            `${serverConfig.messagesHost}/messages/${notificationSbi}/${notificationId}`,
            { json: true }
          )
          const notificationData = {
            ...response.payload.data,
            requestedDate: formatDate(response.payload.data.requestedDate)
          }
          return h.view('view-message', { notificationData })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
]
