# node-fb-messenger [![npm](https://img.shields.io/npm/v/fb-messenger.svg)](https://www.npmjs.com/package/fb-messenger) [![npm](https://img.shields.io/npm/dm/fb-messenger.svg)](https://www.npmjs.com/package/fb-messenger) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![npm](https://img.shields.io/npm/l/fb-messenger.svg)](LICENSE) 
#### Facebook Messenger Platform NodeJS API Wrapper

## Installation

```bash
npm install fb-messenger --save
```

## API

You must require fb-messenger and create an instance

```js
// Constructor
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(token[, notification_type])

// Functions
messenger.sendTextMessage(id, message[, notification_type][, cb]) // Sends a text message

messenger.sendImageMessage(id, imageURL[, notification_type][, cb]) // Sends an image from URL

messenger.sendGenericMessage(id, elements[, notification_type][, cb]) // Sends an H-Scroll generic message
messenger.sendHScrollMessage(id, elements[, notification_type][, cb]) // Sends an H-SCroll generic message (Alias)

messenger.sendButtonsMessage(id, message, buttons[, notification_type][, cb]) // Sends a buttons message
messenger.sendButtonMessage(id, message, buttons[, notification_type][, cb]) // Sends a buttons message (Alias)

messenger.sendReceiptMessage(id, payload[, notification_type][, cb]) // Sends a receipt message (No need for template_type in payload) 

messenger.sendMessage(id, messageData[, notification_type][, cb]) // Send a message from custom data

messenger.getProfile(id, cb) // Gets user information

messenger.setWelcomeMessage(pageId, message, cb) // Sets Page's Welcome Message (message can be a text string or a strucuted message)
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