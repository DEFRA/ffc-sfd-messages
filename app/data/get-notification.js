const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const { formatDate } = require('../utils')

const getNotification = async (id) => {
  try {
    const query = `query {
      notification(id: "${id}") {
        id
        scheme
        tags
        crn
        sbi
        heading
        body
        requestedDate
      }
    }`

    const { payload } = await Wreck.post(serverConfig.dataHost, {
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({ query }),
      json: true
    })

    const notification = payload.data.notification
    if (notification) {
      notification.requestedDate = formatDate(notification.requestedDate)
    }

    return notification
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = getNotification
