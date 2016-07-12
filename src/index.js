import request from 'request'

class FBMessenger {
  constructor (token, notificationType) {
    this.token = token
    this.notificationType = notificationType || 'REGULAR'
  }

  sendTextMessage (id, text, notificationType, cb) {
    const messageData = {
      text: text
    }
    this.sendMessage(id, messageData, notificationType, cb)
  }

  sendImageMessage (id, imageURL, notificationType, cb) {
    const messageData = {
      'attachment': {
        'type': 'image',
        'payload': {
          'url': imageURL
        }
      }
    }
    this.sendMessage(id, messageData, notificationType, cb)
  }

  sendHScrollMessage (id, elements, notificationType, cb) {
    const messageData = {
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

  sendButtonsMessage (id, text, buttons, notificationType, cb) {
    const messageData = {
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

  sendReceiptMessage (id, payload, notificationType, cb) {
    payload.template_type = 'receipt'
    const messageData = {
      'attachment': {
        'type': 'template',
        'payload': payload
      }
    }
    this.sendMessage(id, messageData, notificationType, cb)
  }

  sendQuickRepliesMessage(id, attachment, quickReplies, notificationType, cb) {
    const attachmentType = (typeof attachment === 'string' ? 'text' : 'attachment')
    const attachmentObject = typeof attachment === 'string' ? attachment : {
      type: 'template',
      'payload': {
        'template_type': 'generic',
        'elements': attachment
      }
    }
    const messageData = {
      [attachmentType]: attachmentObject,
      'quick_replies': quickReplies
    }
    this.sendMessage(id, messageData, notificationType, cb)
  }

  sendMessage (id, data, notificationType = this.notificationType, cb) {
    if (typeof notificationType === 'function') {
      cb = notificationType
      notificationType = this.notificationType
    }
    const req = {
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: this.token },
      method: 'POST',
      json: {
        recipient: {
          id: id
        },
        message: data,
        notification_type: notificationType
      }
    }
    sendRequest(req, cb)
  }

  getProfile (id, cb) {
    const req = {
      method: 'GET',
      uri: `https://graph.facebook.com/v2.6/${id}`,
      qs: {
        fields: 'first_name,last_name,profile_pic,locale,timezone,gender',
        access_token: this.token
      },
      json: true
    }
    sendRequest(req, cb)
  }

  setWelcomeMessage (pageId, message, cb) {
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
    const jsonObject = {
      setting_type: 'call_to_actions',
      thread_state: 'new_thread',
      call_to_actions: [{
        message: message
      }]
    }
    sendThreadSettingsMessage(pageId, jsonObject, cb)
  }

  setGreetingText (pageId, message, cb) {
    const jsonObject = {
      setting_type: 'greeting',
      greeting: {
        text: message
      }
    }
    sendThreadSettingsMessage(pageId, jsonObject, cb)
  }

  setPersistentMenu (pageId, menuItems, cb) {
    const jsonObject = {
      setting_type: 'call_to_actions',
      thread_state: 'existing_thread',
      call_to_actions: menuItems
    }
    sendThreadSettingsMessage(pageId, jsonObject, cb)
  }

  sendThreadSettingsMessage (pageId, jsonObject, cb) {
    const req = {
      method: 'POST',
      uri: `https://graph.facebook.com/v2.6/${pageId}/thread_settings`,
      qs: {
        access_token: this.token
      },
      json: jsonObject
    }
    sendRequest(req, cb)
  }
}

const sendRequest = (req, cb) => {
  request(req, (err, res, body) => {
    if (!cb) return
    if (err) return cb(err)
    if (body.error) return cb(body.error)
    cb(null, body)
  })
}

export default FBMessenger
