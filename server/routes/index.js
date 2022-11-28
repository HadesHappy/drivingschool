const express = require('express')
const app = express()

const questionRoutes = require('./question');
const authRoutes = require('./auth')
const historyRoutes = require('./history')

app.use('/question', questionRoutes)
app.use('/auth', authRoutes)
app.use('/history', historyRoutes)

module.exports = app