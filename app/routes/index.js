const { SFD_VIEW } = require('ffc-auth/scopes')
const { GET } = require('../constants/http-verbs')
const { getOrganisation, getNotifications } = require('../data')

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
