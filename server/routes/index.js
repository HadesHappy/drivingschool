const express = require('express')
const app = express()

const questionRoutes = require('./question');
const authRoutes = require('./auth')

app.use('/question', questionRoutes)
app.use('/auth', authRoutes)
module.exports = app