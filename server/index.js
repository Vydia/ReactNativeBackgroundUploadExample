const contentType = require('content-type')
const express = require('express')
const { writeFile } = require('fs')
const getRawBody = require('raw-body')
const uuidv4 = require('uuid/v4')
const multer  = require('multer')
const upload = multer({ dest: 'tmp/multipart/' })

const app = express()

const helloMessage = 'Hi! The server is listening on port 3000. Use the React Native app to start an upload.'

app.get('/', function (req, res) {
  res.send(helloMessage)
})

app.post('/upload_multipart', upload.single('uploaded_media'), function (req, res) {
  console.log('/upload_multipart')
  console.log(`Received headers: ${JSON.stringify(req.headers)}`)
  console.log(`Wrote to: ${req.file.path}`)
  res.status = 202
  res.end()
})

app.post('/upload_raw', function (req, res, next) {
  console.log('/upload_raw')
  console.log(`Received headers: ${JSON.stringify(req.headers)}`)

  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '50mb',
    encoding: contentType.parse(req).parameters.charset
  }, function (err, data) {
    if (err) return next(err)

    const savePath = `tmp/raw/${uuidv4()}`
    console.log(`Writing to: ${savePath}`)

    writeFile(savePath, data, 'binary', function (err) {
      if (err) {
        console.log('Write error:', err)
        res.status = 500
      } else {
        console.log('Wrote file.')
        res.status = 202
      }
      res.end()
    })
  })
})

app.listen(3000, function () {
  console.log(helloMessage)
})
