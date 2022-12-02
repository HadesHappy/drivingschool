const express = require('express')
const router = express.Router()
const {authorizeBearerToken} = require('../middleware/auth.middleware')
const historyController = require('../controllers/history.controller')

router.post('/add', [authorizeBearerToken], historyController.saveHistory);

module.exports = router