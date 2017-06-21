const express = require('express')

const app = express()

const helloMessage = 'Hi! The server is running. Use the React Native app to start an upload.'

app.get('/', function (req, res) {
  res.send(helloMessage)
})

app.post('/upload', function (req, res) {
  res.send('TODO')
})

app.listen(3000, function () {
  console.log(helloMessage)
})
