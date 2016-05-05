var request = require('request')

function FBMessenger (token, notificationType) {
  this.token = token
  this.notificationType = notificationType || 'REGULAR'
}

FBMessenger.prototype.sendTextMessage = function (id, text, notificationType, cb) {
  var messageData = {
    text: text
  }
  this.sendMessage(id, messageData, notificationType, cb)
}

FBMessenger.prototype.sendImageMessage = function (id, imageURL, notificationType, cb) {
  var messageData = {
    'attachment': {
      'type': 'image',
      'payload': {
        'url': imageURL
      }
    }
  }
  this.sendMessage(id, messageData, notificationType, cb)
}

FBMessenger.prototype.sendGenericMessage =
FBMessenger.prototype.sendHScrollMessage = function (id, elements, notificationType, cb) {
  var messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': elements
      }
    }
  }
  this.sendMessage(id, messageData, notificationType, cb)
}

FBMessenger.prototype.sendButtonMessage =
FBMessenger.prototype.sendButtonsMessage = function (id, text, buttons, notificationType, cb) {
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
  this.sendMessage(id, messageData, notificationType, cb)
}

FBMessenger.prototype.sendReceiptMessage = function (id, payload, notificationType, cb) {
  payload.template_type = 'receipt'
  var messageData = {
    'attachment': {
      'type': 'template',
      'payload': payload
    }
  }
  this.sendMessage(id, messageData, notificationType, cb)
}

FBMessenger.prototype.sendMessage = function (id, data, notificationType, cb) {
  notificationType = notificationType || this.notificationType
  if (typeof notificationType === 'function') {
    cb = notificationType
    notificationType = this.notificationType
  }
  var req = {
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: this.token},
    method: 'POST',
    json: {
      recipient: {id: id},
      message: data,
      notification_type: notificationType
    }
  }
  request(req, function (err, res, body) {
    if (!cb) return
    if (err) return cb(err)
    if (body.error) return cb(body.error)
    cb(null, body)
  })
}

FBMessenger.prototype.getProfile = function (id, cb) {
  var req = {
    method: 'GET',
    uri: 'https://graph.facebook.com/v2.6/' + id,
    qs: {
      fields: 'first_name,last_name,profile_pic',
      access_token: this.token
    },
    json: true
  }
  request(req, function (err, res, body) {
    if (!cb) return
    if (err) return cb(err)
    if (body.error) return cb(body.error)
    cb(null, body)
  })
}

FBMessenger.prototype.setWelcomeMessage = function (pageId, message, cb) {
  if (typeof message === 'string') {
    message = {
      text: message
    }
  } else {
    message = {
      attachment: {
        type: 'template',
        payload: message
      }
    }
  }
  var req = {
    method: 'POST',
    uri: 'https://graph.facebook.com/v2.6/' + pageId + '/thread_settings',
    qs: {
      access_token: this.token
    },
    json: {
      setting_type: 'call_to_actions',
      thread_state: 'new_thread',
      call_to_actions:[
        {
          message: message
        }
      ]
    }
  }
  request(req, function (err, res, body) {
    if (!cb) return
    if (err) return cb(err)
    if (body.error) return cb(body.error)
    cb(null, body)
  })
}

module.exports = FBMessenger
