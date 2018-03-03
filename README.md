# fb-messenger [![npm](https://img.shields.io/npm/v/fb-messenger.svg)](https://www.npmjs.com/package/fb-messenger) [![npm](https://img.shields.io/npm/dm/fb-messenger.svg)](https://www.npmjs.com/package/fb-messenger) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![npm](https://img.shields.io/npm/l/fb-messenger.svg)](LICENSE) 
#### Facebook Messenger Platform NodeJS API Wrapper

[![Greenkeeper badge](https://badges.greenkeeper.io/DiegoRBaquero/node-fb-messenger.svg)](https://greenkeeper.io/)
[![bitHound Overall Score](https://www.bithound.io/github/DiegoRBaquero/node-fb-messenger/badges/score.svg)](https://www.bithound.io/github/DiegoRBaquero/node-fb-messenger) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b3cbd4666fa54722b38288c98cd5e8c1)](https://www.codacy.com/app/diegorbaquero/node-fb-messenger?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DiegoRBaquero/node-fb-messenger&amp;utm_campaign=Badge_Grade) [![Code Climate](https://codeclimate.com/github/DiegoRBaquero/node-fb-messenger/badges/gpa.svg)](https://codeclimate.com/github/DiegoRBaquero/node-fb-messenger)

## Installation

```bash
npm install fb-messenger --save
```

## API

You must require fb-messenger and create an instance

```js
// Constructor
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(token[, notificationType])

// Functions
messenger.sendTextMessage(id, message[, notificationType][, cb]) // Sends a text message

messenger.sendImageMessage(id, imageURL[, notificationType][, cb]) // Sends an image from URL

messenger.sendHScrollMessage(id, elements[, notificationType][, cb]) // Sends an H-SCroll generic message

messenger.sendButtonsMessage(id, message, buttons[, notificationType][, cb]) // Sends a buttons message

messenger.sendListMessage(id, elements, buttons, top_element_type[, notificationType][, cb]) // Sends a list message

messenger.sendReceiptMessage(id, payload[, notificationType][, cb]) // Sends a receipt message (No need for template_type in payload) 

messenger.sendQuickRepliesMessage(id, attachment, quickReplies[, notificationType][, cb]) // Sends a Quick Replies Message

messenger.sendOpenGraphMessage(id, payload[, notificationType][, cb]) // Sends a Open Graph Message

messenger.sendMessage(id, messageData[, notificationType][, cb]) // Send a message from custom data

messenger.sendAction(id, actionType) // Send an action type (One of 'mark_seen', 'typing_on', 'typing_off')

messenger.getProfile(id, cb) // Gets user information

messenger.setWelcomeMessage(pageId, message[, cb]) // Sets Page's Welcome Message (message can be a text string or a strucuted message)

messenger.setGreetingText (pageId, message[, cb]) // Sets Page's Greeting Text

messenger.setPersistentMenu (pageId, menuItems[, cb]) // Set's Page's Persistent Menu

messenger.setDomainWhitelist (pageId, domains[, cb]) // Set's Page's Whitelisted Domains 

messenger.sendThreadSettingsMessage (pageId, jsonObject[, cb]) // Send Manually Page's Thread Settings
```

#### Notification Types:
 - REGULAR
 - SILENT_PUSH
 - NO_PUSH

## Examples

### Basic Example

```js
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(<YOUR TOKEN>)

messenger.sendTextMessage(<ID>, 'Hello')
```

### Callback Example

```js
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(<YOUR TOKEN>)

messenger.sendTextMessage(<ID>, 'Hello', function (err, body) {
  if(err) return console.error(err)
  console.log(body)
})
```

### No push Example

```js
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(<YOUR TOKEN>)

messenger.sendTextMessage(<ID>, 'Hello', 'NO_PUSH')
```

### Default to silent push Example

```js
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(<YOUR TOKEN>, 'SILENT_PUSH')

messenger.sendTextMessage(<ID>, 'Hello')
```

### Complete Example

```js
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(<YOUR TOKEN>, 'NO_PUSH')

messenger.sendTextMessage(<ID>, 'Hello') // Send a message with NO_PUSH, no callback

// Send an image overriding default notification type with callback
messenger.sendImageMessage(<ID>, <IMG URL>, 'REGULAR', function (err, body) {
  if (err) return console.error(err)
  console.log('Image sent successfully')
})
```

## License

MIT. Copyright (c) [Diego Rodríguez Baquero](https://diegorbaquero.com).
