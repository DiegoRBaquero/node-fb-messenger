# node-fb-messenger [![npm](https://img.shields.io/npm/v/fb-messenger.svg)](https://www.npmjs.com/package/fb-messenger) [![npm](https://img.shields.io/npm/dm/fb-messenger.svg)](https://www.npmjs.com/package/fb-messenger) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![npm](https://img.shields.io/npm/l/fb-messenger.svg)](LICENSE) 
#### Facebook Messenger Platform NodeJS API Wrapper

## Installation

```bash
npm install fb-messenger --save
```

## Usage

In your node program:

```js
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(<YOUR TOKEN>)
```

## API

After you have required fb-messenger and created an instance you can use the following functions

```js
messenger.sendTextMessage(id, message[, cb]) // Sends a text message

messenger.sendImageMessage(id, imageURL[, cb]) // Sends an image from URL

messenger.sendGenericMessage(id, elements[, cb]) // Sends an H-Scroll generic message
messenger.sendHScrollMessage(id, elements[, cb]) // Sends an H-SCroll generic message (Alias)

messenger.sendButtonsMessage(id, message, buttons[, cb]) // Sends a buttons message
messenger.sendButtonMessage(id, message, buttons[, cb]) // Sends a buttons message (Alias)

messenger.sendReceiptMessage(id, payload[, cb]) // Sends a receipt message (No need for template_type in payload) 

messenger.sendMessage(id, messageData[, cb]) // Send a message from custom data

messenger.getProfile(id, cb) // Gets user information
```

## Example

```js
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(<YOUR TOKEN>)

messenger.sendTextMessage(<ID>, 'Hello', function (err, body) {
  if (err) return console.error(err)
  console.log(body) // Prints { "recipient_id": <rid>, "message_id": <mid> }
})

messenger.getProfile(<ID>, function (err, body) {
  if (err) return console.error(err)
  console.log(body) // Prints { first_name: XXXXX, last_name: YYYYYY, profile_pic: IMAGE_URL}
})
```

## License

MIT. Copyright (c) [Diego Rodríguez Baquero](https://diegorbaquero.com).