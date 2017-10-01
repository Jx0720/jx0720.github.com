const express = require('express')
const app = express()
const port = require('./config.js').port
const apis = require('./index.js')

Object.keys(apis).forEach(apiKey => {
  let key = apiKey.toLowerCase()
  let method = 'get'
  let url = ''

  if (/put:/.test(key)) {
    url = key.slice(4)
    method = 'put'
  } else if (/post:/.test(key)) {
    url = key.slice(5)
    method = 'post'
  } else if (/delete:/.test(key)) {
    url = key.slice(7)
    method = 'delete'
  } else if (/get:/.test(key)) {
    url = key.slice(4)
    method = 'get'
  } else {
    url = key
  }

  app[method](url, (req, res) => {
    res.json(apis[apiKey])
  })
})

app.get('/', (req, res) => {
  res.send('Mock server running')
})

app.listen(port, (err, result) => {
  if (err) {
    console.log(err)
  }
  console.log('Mock Server running on http://localhost:' + port)
})
