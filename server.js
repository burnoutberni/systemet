const fs = require('fs')
const https = require('https')
const express = require('express')
const products = require(__dirname + '/all.json')

let app = express()
let port = 8081;

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(port);

app.get('/', (req, res) => {
  res.json({'status' : 'online'})
})

app.get('/:productId', (req, res) => {
  const product = products.find(product => product.nr === req.params.productId)
  res.json(product)
})
