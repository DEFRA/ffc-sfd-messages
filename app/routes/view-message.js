const { GET } = require('../constants/http-verbs')
const { SFD_VIEW } = require('ffc-auth/scopes')
const { getNotification } = require('../data')

module.exports = {
  method: GET,
  path: '/view-message/{sbi}/{id}',
  options: {
    auth: { strategy: 'jwt', scope: [SFD_VIEW] },
    handler: async (request, h) => {
      try {
        const notificationData = await getNotification(request.params.id)
        return h.view('view-message', { notificationData })
      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
}
