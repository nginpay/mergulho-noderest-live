const serverless = require("serverless-http");
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

require('./routes/app.routes')(app)
module.exports.handler = serverless(app);
