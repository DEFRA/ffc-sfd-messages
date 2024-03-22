const { formatDate } = require('../../utils/format-date')

function ViewModel(rawData) {
  this.messages = rawData.map((message) => ({
    ...message,
    requestedDate: formatDate(message.requestedDate)
  }))
}

module.exports = ViewModel