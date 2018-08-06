const fetch = require('node-fetch')

class FBMessenger {
  constructor (token, notificationType) {
    this.token = token
    this.notificationType = notificationType || 'REGULAR'
  }

  async sendAction (id, action) {
    this.sendMessage(id, action)
  }

  async sendTextMessage (id, text, notificationType) {
    const messageData = {
      text: text
    }
    return this.sendMessage(id, messageData, notificationType)
  }

  async sendImageMessage (id, imageURL, notificationType) {
    const messageData = {
      'attachment': {
        'type': 'image',
        'payload': {
          'url': imageURL
        }
      }
    }
    return this.sendMessage(id, messageData, notificationType)
  }

  async sendHScrollMessage (id, elements, notificationType) {
    const messageData = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'generic',
          'elements': elements
        }
      }
    }
    return this.sendMessage(id, messageData, notificationType)
  }

  async sendButtonsMessage (id, text, buttons, notificationType) {
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
    return this.sendMessage(id, messageData, notificationType)
  }

  async sendListMessage (id, elements, buttons = [], topElementStyle = 'large', notificationType) {
    const messageData = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'list',
          'top_element_style': topElementStyle,
          'elements': elements,
          'buttons': buttons
        }
      }
    }
    return this.sendMessage(id, messageData, notificationType)
  }

  async sendReceiptMessage (id, payload, notificationType) {
    payload.template_type = 'receipt'
    const messageData = {
      'attachment': {
        'type': 'template',
        'payload': payload
      }
    }
    return this.sendMessage(id, messageData, notificationType)
  }

  async sendQuickRepliesMessage (id, attachment, quickReplies, notificationType) {
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
    return this.sendMessage(id, messageData, notificationType)
  }

  async sendMessage (id, data, notificationType = this.notificationType) {
    const body = {
      recipient: {
        id: id
      }
    }

    if (typeof data === 'string') {
      body.sender_action = data
    } else {
      body.message = data
      body.notification_type = notificationType
    }

    const options = {
      method: 'POST',
      body
    }
    return sendRequest({url: 'https://graph.facebook.com/v2.6/me/messages', options})
  }

  getProfile (id) {
    const req = {
      method: 'GET',
      uri: `https://graph.facebook.com/v2.6/${id}`,
      qs: {
        fields: 'first_name,last_name,profile_pic,locale,timezone,gender',
        access_token: this.token
      },
      json: true
    }
    sendRequest(req)
  }

  setWelcomeMessage (pageId, message) {
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
    this.sendThreadSettingsMessage(pageId, jsonObject)
  }

  setGreetingText (pageId, message) {
    const jsonObject = {
      setting_type: 'greeting',
      greeting: {
        text: message
      }
    }
    this.sendThreadSettingsMessage(pageId, jsonObject)
  }

  setPersistentMenu (pageId, menuItems) {
    const jsonObject = {
      setting_type: 'call_to_actions',
      thread_state: 'existing_thread',
      call_to_actions: menuItems
    }
    this.sendThreadSettingsMessage(pageId, jsonObject)
  }

  setDomainWhitelist (pageId, domains) {
    const jsonObject = {
      setting_type: `domain_whitelisting`,
      whitelisted_domains: domains,
      domain_action_type: `add`
    }
    this.sendThreadSettingsMessage(pageId, jsonObject)
  }

  sendThreadSettingsMessage (pageId, jsonObject) {
    const req = {
      method: 'POST',
      uri: `https://graph.facebook.com/v2.6/${pageId}/thread_settings`,
      qs: {
        access_token: this.token
      },
      json: jsonObject
    }
    sendRequest(req)
  }
}

const sendRequest = async (url, options) => {
  return (await fetch(`${url}?access_token=${options.token}`,
    {
      ...options,
      body: JSON.stringify(options.body),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )).json()
}

export default FBMessenger
