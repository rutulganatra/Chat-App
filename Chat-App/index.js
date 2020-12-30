const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config()
var cors = require('cors')
const config = require('./config/app');
const port =  config.appPort ;
const router = require('./router')
const bodyparser = require('body-parser')
const http = require('http')

app.use(bodyparser.urlencoded({ extended:true}))
app.use(bodyparser.json())
app.use(cors())

app.use(router)

app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/uploads'))

const server = http.createServer(app)
const SocketServer = require('./socket')
SocketServer(server)

server.listen(port,() => {
    console.log(`Server listening on ${port}.`)
})

console.log("Hello World")