const express = require('express')
const app = express()

const testRoutes = require('./test');
const authRoutes = require('./auth')
const historyRoutes = require('./history')

app.use('/test', testRoutes)
app.use('/auth', authRoutes)
app.use('/history', historyRoutes)

module.exports = app