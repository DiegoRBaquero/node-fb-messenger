const fetch = require('node-fetch')

class FBMessenger {
  constructor ({token, notificationType = 'REGULAR'}) {
    this.token = token
    this.notificationType = notificationType
  }

  async sendAction (id, action) {
    this.sendMessage(id, action)
  }

  async sendTextMessage ({id, text, notificationType}) {
    const data = {
      text
    }
    return this.sendMessage({id, data, notificationType})
  }

  async sendImageMessage ({id, url, notificationType}) {
    const data = {
      'attachment': {
        'type': 'image',
        'payload': {
          'url': url
        }
      }
    }
    return this.sendMessage({id, data, notificationType})
  }

  async sendHScrollMessage ({id, elements, notificationType}) {
    const data = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'generic',
          'elements': elements
        }
      }
    }
    return this.sendMessage({id, data, notificationType})
  }

  async sendButtonsMessage ({id, text, buttons, notificationType}) {
    const data = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': text,
          'buttons': buttons
        }
      }
    }
    return this.sendMessage({id, data, notificationType})
  }

  async sendListMessage ({id, elements, buttons = [], topElementStyle = 'large', notificationType}) {
    const data = {
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
    return this.sendMessage({id, data, notificationType})
  }

  async sendReceiptMessage ({id, payload, notificationType}) {
    payload.template_type = 'receipt'
    const data = {
      'attachment': {
        'type': 'template',
        'payload': payload
      }
    }
    return this.sendMessage({id, data, notificationType})
  }

  async sendQuickRepliesMessage ({id, attachment, quickReplies, notificationType}) {
    const attachmentType = (typeof attachment === 'string' ? 'text' : 'attachment')
    const attachmentObject = typeof attachment === 'string' ? attachment : {
      type: 'template',
      'payload': {
        'template_type': 'generic',
        'elements': attachment
      }
    }
    const data = {
      [attachmentType]: attachmentObject,
      'quick_replies': quickReplies
    }
    return this.sendMessage({id, data, notificationType})
  }

  async sendMessage ({id, data, notificationType = this.notificationType}) {
    const body = {
      recipient: {
        id
      }
    }

    if (typeof data === 'string') {
      body.sender_action = data
    } else {
      body.message = data
      body.notification_type = notificationType
    }

    return (await fetch(`https://graph.facebook.com/v2.6/me/messages?access_token=${this.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })).json()
  }

  // --- GET PROFILE ---
  async getProfile (id) {
    return (await fetch(`https://graph.facebook.com/v2.6/${id}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${this.token}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })).json()
  }

  // START THREAD SETTINGS
  async setWelcomeMessage ({pageId, message}) {
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
    const body = {
      setting_type: 'call_to_actions',
      thread_state: 'new_thread',
      call_to_actions: [{
        message: message
      }]
    }
    this.sendThreadSettingsMessage({pageId, body})
  }

  async setGreetingText ({pageId, message}) {
    const body = {
      setting_type: 'greeting',
      greeting: {
        text: message
      }
    }
    return this.sendThreadSettingsMessage({pageId, body})
  }

  async setPersistentMenu ({pageId, menuItems}) {
    const body = {
      setting_type: 'call_to_actions',
      thread_state: 'existing_thread',
      call_to_actions: menuItems
    }
    return this.sendThreadSettingsMessage({pageId, body})
  }

  async setDomainWhitelist ({pageId, domains}) {
    const body = {
      setting_type: `domain_whitelisting`,
      whitelisted_domains: domains,
      domain_action_type: `add`
    }
    return this.sendThreadSettingsMessage({pageId, body})
  }

  async sendThreadSettingsMessage ({pageId, body}) {
    return (await fetch(`https://graph.facebook.com/v2.6/${pageId}/thread_settings?${this.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })).json()
  }
  // END THREAD SETTINGS
}

module.exports = FBMessenger
