const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const getNotifications = async (sbi) => {
  try {
    const query = `query {
      notificationsBySbi(sbi: "${sbi}") {
        sbi
        notifications {
          id
          scheme
          tags
          crn
          sbi
          heading
          body
          requestedDate
        }
      }
    }`

    const { payload } = await Wreck.post(serverConfig.dataHost, {
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({ query }),
      json: true
    })

    return payload.data.notificationsBySbi
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = getNotifications
