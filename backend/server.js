const express = require('express')
const configure = require('./src/config/init')
const app = express()
configure(app)
