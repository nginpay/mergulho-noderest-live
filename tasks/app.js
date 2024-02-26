require('dotenv').config()
const serverless = require("serverless-http");
const express = require('express')

const app = express()

app.use(express.json())

require('./routes/app.routes')(app)

// module.exports = app;

module.exports.handler = serverless(app);
