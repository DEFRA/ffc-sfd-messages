const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

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

  return payload.data.notification
}

module.exports = getNotification
