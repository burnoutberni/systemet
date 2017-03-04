const fs = require('fs')
const https = require('https')
const express = require('express')
const cors = require('cors')
const products = require(__dirname + '/all.json')

let app = express()
let port = 8081;

https.createServer({
  key: fs.readFileSync(__dirname + '/key.pem'),
  cert: fs.readFileSync(__dirname + '/cert.pem')
}, app).listen(port);

app.use(cors())

app.get('/', (req, res) => {
  res.json({'status' : 'online'})
})

app.get('/:productId', (req, res) => {
  const product = products.find(product => product.nr === req.params.productId)
  res.json(product)
})
