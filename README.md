# fb-messenger [![npm](https://img.shields.io/npm/v/fb-messenger.svg)](https://www.npmjs.com/package/fb-messenger) [![npm](https://img.shields.io/npm/dm/fb-messenger.svg)](https://www.npmjs.com/package/fb-messenger) [![npm](https://img.shields.io/npm/l/fb-messenger.svg)](LICENSE) 
#### Facebook Messenger Platform NodeJS API Wrapper

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/DiegoRBaquero/node-fb-messenger.svg)](https://greenkeeper.io/) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b3cbd4666fa54722b38288c98cd5e8c1)](https://www.codacy.com/app/diegorbaquero/node-fb-messenger?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DiegoRBaquero/node-fb-messenger&amp;utm_campaign=Badge_Grade) [![Code Climate](https://codeclimate.com/github/DiegoRBaquero/node-fb-messenger/badges/gpa.svg)](https://codeclimate.com/github/DiegoRBaquero/node-fb-messenger)

## Installation

**Requires Node 8+**

```bash
npm install fb-messenger --save
```

## API

You must require fb-messenger and create an instance

```js
// Constructor
const FBMessenger = require('fb-messenger')
const messenger = new FBMessenger({token, notificationType})
// token is optional, if not included, must be sent in each method, notificationType is optional, default = 'REGULAR'

messenger.setToken(token) // Sets the instance token

messenger.setNotificationType(notificationType) // Sets the instance notificationType

// Methods (notificationType and token are optional)
messenger.sendTextMessage({id, message, notificationType, token}) // Sends a text message

messenger.sendAudioMessage({id, url, notificationType, token}) // Sends an audio from URL

messenger.sendVideoMessage({id, url, notificationType, token}) // Sends an video from URL

messenger.sendImageMessage({id, url, notificationType, token}) // Sends an image from URL

messenger.sendFileMessage({id, url, notificationType, token}) // Sends an file from URL

messenger.sendQuickRepliesMessage({id, attachment, quickReplies, notificationType, token}) // Sends a Quick Replies Message

messenger.sendButtonsMessage({id, message, buttons, notificationType, token}) // Sends a buttons template message

messenger.sendGenericMessage({id, elements, notificationType, token}) // Sends a generic template message

messenger.sendListMessage({id, elements, buttons, top_element_type, notificationType, token}) // Sends a list template message

messenger.sendMediaMessage({id, elements, notificationType, token}) // Sends a media template message

messenger.sendOpenGraphMessage({id, elements, notificationType, token}) // Sends an open graph template message

messenger.sendReceiptMessage({id, payload, notificationType, token}) // Sends a receipt template message (No need for template_type in payload) 

messenger.sendAction({id, actionType, token}) // Send an action type (One of 'mark_seen', 'typing_on', 'typing_off')

messenger.sendMessage({id, data, notificationType, token}) // Send a message from custom data

messenger.getProfile({id, token}) // Gets user information

messenger.setWelcomeMessage({pageId, message, token}) // Sets Page's Welcome Message (message can be a text string or a strucuted message)

messenger.setGreetingText ({pageId, message, token}) // Sets Page's Greeting Text

messenger.setPersistentMenu ({pageId, menuItems, token}) // Set's Page's Persistent Menu

messenger.setDomainWhitelist ({pageId, domains, token}) // Set's Page's Whitelisted Domains 

messenger.sendThreadSettingsMessage ({pageId, body, token}) // Send Manually Page's Thread Settings
```

#### Notification Types:
 - REGULAR
 - SILENT_PUSH
 - NO_PUSH

## Examples

### Basic Example

```js
const FBMessenger = require('fb-messenger')
const messenger = new FBMessenger({token: '<YOUR TOKEN>'}) // Will always use this page's token for request unless sent on each method

messenger.sendTextMessage({id: '<ID>', text: 'Hello'})
```

### Catch errors Example

```js
const FBMessenger = require('fb-messenger')
const messenger = new FBMessenger({token: '<YOUR TOKEN>'})

try {
  const response = await messenger.sendTextMessage({id: '<ID>', text: 'Hello'})
  console.log(response)
} catch (e) {
  console.error(e)
}
```

### No push Example

```js
const FBMessenger = require('fb-messenger')
const messenger = new FBMessenger({token: '<YOUR TOKEN>'})

messenger.sendTextMessage({id: '<ID>', text: 'Hello', notificationType: 'NO_PUSH'})
```

### Default to silent push Example

```js
const FBMessenger = require('fb-messenger')
const messenger = new FBMessenger({token: '<YOUR TOKEN>', notificationType: 'SILENT_PUSH'})
```

### Complete Example

```js
const FBMessenger = require('fb-messenger')
const messenger = new FBMessenger({token: '<YOUR TOKEN>', notificationType: 'NO_PUSH'})

try {
  await messenger.sendTextMessage({id: '<ID>', text: 'Hello'}) // Send a message with NO_PUSH, ignoring response
  console.log('Sent successfully')
} catch(e) {
  console.error(e)
}

// Send an image overriding default notification type with callback
try {
  const response = await messenger.sendImageMessage({id: '<ID>', url: '<IMG URL>', notificationType: 'REGULAR'})
  console.log('Sent image, response:')
  console.dir(response)
} catch(e) {
  console.error(e)
}

messenger.sendTextMessage({id: '<ID>', text: 'Hello', token: '<YOUR OTHER TOKEN>'}) // Send message on another page
```

## License

MIT. Copyright © [Diego Rodríguez Baquero](https://diegorbaquero.com)
