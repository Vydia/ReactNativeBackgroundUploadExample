const contentType = require('content-type')
const express = require('express')
const { writeFile } = require('fs')
const getRawBody = require('raw-body')
const uuidv4 = require('uuid/v4');

const app = express()

const helloMessage = 'Hi! The server is listening on port 3000. Use the React Native app to start an upload.'

// Set `req.text` so we can write it to file.
app.use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '50mb',
    encoding: contentType.parse(req).parameters.charset
  }, function (err, string) {
    if (err) return next(err)

    req.text = string
    next()
  })
})

app.get('/', function (req, res) {
  res.send(helloMessage)
})

app.post('/upload', function (req, res) {
  const savePath = `tmp/${uuidv4()}`
  console.log(`Writing to: ${savePath}`)

  writeFile(savePath, req.text, 'binary', function (err) {
    if (err) {
      res.status = 500
      console.log('Write error:', err)
    } else {
      res.status = 202
      console.log('Wrote file.')
    }
    res.end()
  })
})

app.listen(3000, function () {
  console.log(helloMessage)
})
