const Wreck = require('@hapi/wreck')
const { SFD_VIEW } = require('ffc-auth/scopes')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')
const { GET } = require('../constants/http-verbs')
const { serverConfig } = require('../config')

module.exports = {
  method: GET,
  path: '/',
  options: {
    auth: { strategy: 'jwt', scope: [SFD_VIEW] },
    handler: async (request, h) => {
      try {
        const organisation = await getOrganisation(request)
        const notificationData = await getNotifications(organisation.sbi)
        return h.view('home', { notificationData, organisation })
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
        sbi
        notifications {
          id
          content
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

    console.log(payload.data.notificationsBySbi)
    return payload.data.notificationsBySbi
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
