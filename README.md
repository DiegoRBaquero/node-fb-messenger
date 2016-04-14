# node-fb-messenger
#### Facebook Messenger Platform NodeJS API Wrapper

## Installation

```bash
npm i fb-messenger --save
```

## Usage

In your node program:

```js
var FacebookMessenger = require('fb-messenger')
var messenger = new FacebookMessenger(<YOUR TOKEN>)
```

## API

After you have required fb-messenger and created an instance you can use the following functions

```js
messenger.sendTextMessage(id, message, cb) // Sends a text message
messenger.sendImageMessage(id, imageURL, cb) // Sends an image from URL
messenger.sendHScrollMessage(id, elements, cb) // Sends an H-SCroll Generic Message
messenger.sendMessage(id, messageData, cb) // Send a message from custom data
```

## Example

```js
var FacebookMessenger = require('fb-messenger')
var messenger = new FacebookMessenger(<YOUR TOKEN>)

messenger.sendTextMessage(<ID>, 'Hola', function (err, body) {
  if (err) {
    console.error(err)
    return
  }
  console.log(body)
})
```
