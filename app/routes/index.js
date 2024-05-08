const Wreck = require('@hapi/wreck')
const { SFD_VIEW } = require('ffc-auth/scopes')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')
const { GET } = require('../constants/http-verbs')
const { serverConfig } = require('../config')
// const { formatDate } = require('../utils/format-date')
// const { server } = require('@hapi/hapi')

module.exports = {
  method: GET,
  path: '/',
  options: {
    auth: { strategy: 'jwt', scope: [SFD_VIEW] },
    handler: async (request, h) => {
      try {
        const organisation = await getOrganisation(request)
        const notifications = await getNotifications(organisation.sbi)
        return h.view('home', { notifications, organisation })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

const getNotifications = async (sbi) => {
  try {
    const query = `query {
      notificationsBySbi(sbi: "${sbi}") {
        notifications {
          content
        }
      }
    }`

    const { payload } = await Wreck.post(serverConfig.dataHost, {
      payload: JSON.stringify({ query }),
      json: true
    })

    return payload.data.notifications
  } catch (error) {
    console.log(error)
  }
}

const getOrganisation = async (request) => {
  const query = `query {
          organisation(organisationId: ${request.auth.credentials.organisationId}) {
            sbi
            name
            mobile
            email
            address {
              fullAddress
            }
            type
            legalStatus
          }
        }`

  const { payload } = await Wreck.post(serverConfig.dataHost, {
    headers: {
      crn: request.auth.credentials.crn,
      Authorization: request.state[AUTH_COOKIE_NAME],
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify({ query }),
    json: true
  })
  return payload.data.organisation
}
