const fetch = require('node-fetch')

class FBMessenger {
  constructor ({token, notificationType = 'REGULAR'} = {}) {
    this.token = token
    this.notificationType = notificationType
  }

  setToken (token) {
    this.token = token
  }

  setNotificationType (notificationType = 'REGULAR') {
    this.notificationType = notificationType
  }

  async sendTextMessage ({id, text, ...rest}) {
    const data = {
      text
    }
    return this.sendMessage({id, data, ...rest})
  }

  async sendAudioMessage ({id, url, ...rest}) {
    const data = {
      attachment: {
        type: 'audio',
        payload: {
          url
        }
      }
    }
    return this.sendMessage({id, data, ...rest})
  }

  async sendVideoMessage ({id, url, ...rest}) {
    const data = {
      attachment: {
        type: 'video',
        payload: {
          url
        }
      }
    }
    return this.sendMessage({id, data, ...rest})
  }

  async sendImageMessage ({id, url, ...rest}) {
    const data = {
      attachment: {
        type: 'image',
        payload: {
          url
        }
      }
    }
    return this.sendMessage({id, data, ...rest})
  }

  async sendFileMessage ({id, url, ...rest}) {
    const data = {
      attachment: {
        type: 'file',
        payload: {
          url
        }
      }
    }
    return this.sendMessage({id, data, ...rest})
  }

  // START TEMPLATES

  async sendQuickRepliesMessage ({id, attachment, quickReplies, ...rest}) {
    const attachmentType = typeof attachment === 'string' ? 'text' : 'attachment'
    const attachmentObject = typeof attachment === 'string' ? attachment : {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: attachment
      }
    }
    const data = {
      [attachmentType]: attachmentObject,
      quick_replies: quickReplies
    }
    return this.sendMessage({id, data, ...rest})
  }

  async sendButtonsMessage ({id, text, buttons, ...rest}) {
    const data = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text,
          buttons
        }
      }
    }
    return this.sendMessage({id, data, ...rest})
  }

  async sendGenericMessage ({id, elements, ...rest}) {
    const data = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements
        }
      }
    }
    return this.sendMessage({id, data, ...rest})
  }

  async sendListMessage ({id, elements, buttons = [], topElementStyle = 'large', ...rest}) {
    const data = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'list',
          top_element_style: topElementStyle,
          elements,
          buttons
        }
      }
    }
    return this.sendMessage({id, data, ...rest})
  }

  async sendMediaMessage ({id, elements, ...rest}) {
    const data = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'media',
          elements
        }
      }
    }
    return this.sendMessage({id, data, ...rest})
  }

  async sendOpenGraphMessage ({id, elements, ...rest}) {
    const data = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'open_graph',
          elements
        }
      }
    }
    return this.sendMessage({id, data, ...rest})
  }

  async sendReceiptMessage ({id, payload, ...rest}) {
    const data = {
      attachment: {
        type: 'template',
        payload: {
          ...payload,
          template_type: 'receipt'
        }
      }
    }
    return this.sendMessage({id, data, ...rest})
  }

  // END TEMPLATES

  async sendAction ({id, action}) {
    return this.sendMessage({id, data: action})
  }

  async sendMessage ({id, data, ...rest}) {
    const body = {
      recipient: {
        id
      }
    }

    if (typeof data === 'string') {
      body.sender_action = data
    } else {
      body.message = data

      const notificationType = rest.notificationType || this.notificationType
      if (notificationType !== 'REGULAR') { // Only include it if not default
        body.notification_type = notificationType
      }
    }

    if (rest.tag) { // https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags
      body.messaging_type = 'MESSAGE_TAG'
      body.tag = rest.tag
    }

    return (await fetch(`https://graph.facebook.com/v2.6/me/messages?access_token=${rest.token || this.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })).json()
  }

  // GET PROFILE

  async getProfile ({id, ...rest}) {
    return (await fetch(`https://graph.facebook.com/v2.6/${id}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${rest.token || this.token}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })).json()
  }

  // START THREAD SETTINGS

  async setWelcomeMessage ({pageId, message, ...rest}) {
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
    this.sendThreadSettingsMessage({pageId, body, ...rest})
  }

  async setGreetingText ({pageId, message, ...rest}) {
    const body = {
      setting_type: 'greeting',
      greeting: {
        text: message
      }
    }
    return this.sendThreadSettingsMessage({pageId, body, ...rest})
  }

  async setPersistentMenu ({pageId, menuItems, ...rest}) {
    const body = {
      setting_type: 'call_to_actions',
      thread_state: 'existing_thread',
      call_to_actions: menuItems
    }
    return this.sendThreadSettingsMessage({pageId, body, ...rest})
  }

  async setDomainWhitelist ({pageId, domains, ...rest}) {
    const body = {
      setting_type: `domain_whitelisting`,
      whitelisted_domains: domains,
      domain_action_type: `add`
    }
    return this.sendThreadSettingsMessage({pageId, body, ...rest})
  }

  async sendThreadSettingsMessage ({pageId, body, ...rest}) {
    return (await fetch(`https://graph.facebook.com/v2.6/${pageId}/thread_settings?${rest.token || this.token}`,
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
