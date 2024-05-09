const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const { SFD_VIEW } = require('ffc-auth/scopes')

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
        console.log(error)
      }
    }
  }
}

const getNotification = async (id) => {
  const query = `query {
    notification(notificationId: ${id}) {
      id
      content
    }
  }`

  const { payload } = await Wreck.post(serverConfig.dataHost, {
    headers: {
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify({ query }),
    json: true
  })

  console.log(payload.data.notification)
  return payload.data.notification
}
