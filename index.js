var request = require('request')

function FacebookMessenger (token) {
  this.token = token
}

FacebookMessenger.prototype.sendTextMessage = function (id, text, cb) {
  var messageData = {
    text: text
  }
  this.sendMessage(id, messageData, cb)
}

FacebookMessenger.prototype.sendImageMessage = function (id, imageURL, cb) {
  var messageData = {
    'attachment': {
      'type': 'image',
      'payload': {
        'url': imageURL
      }
    }
  }
  this.sendMessage(id, messageData, cb)
}

FacebookMessenger.prototype.sendGenericMessage =
FacebookMessenger.prototype.sendHScrollMessage = function (id, elements, cb) {
  var messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': elements
      }
    }
  }
  this.sendMessage(id, messageData, cb)
}

FacebookMessenger.prototype.sendButtonMessage =
FacebookMessenger.prototype.sendButtonsMessage = function (id, text, buttons, cb) {
  var messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'button',
        'text': text,
        'buttons': buttons
      }
    }
  }
  this.sendMessage(id, messageData, cb)
}

FacebookMessenger.prototype.sendReceiptMessage = function (id, payload, cb) {
  payload.template_type = 'receipt'
  var messageData = {
    'attachment': {
      'type': 'template',
      'payload': payload
    }
  }
  this.sendMessage(id, messageData, cb)
}

FacebookMessenger.prototype.sendMessage = function (id, data, cb) {
  var req = {
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: this.token},
    method: 'POST',
    json: {
      recipient: {id: id},
      message: data
    }
  }
  request(req, function (err, res, body) {
    if (!cb) return
    if (err) {
      cb(err, null)
      return
    } else if (body.error) {
      cb(body.error, null)
      return
    }
    cb(null, body)
  })
}

module.exports = FacebookMessenger
