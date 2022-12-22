const express = require('express')
const { authorizeBearerToken } = require('../middleware/auth.middleware')
const { uploadAvatar } = require('../middleware/uploadAvatar')
const authController = require('../controllers/auth.controller')

const router = express.Router()

router.get('/getAccount', [authorizeBearerToken], authController.getAccount)

router.post('/register', [uploadAvatar], authController.register)

router.post('/login', authController.login)

router.post('/changeAccount', [authorizeBearerToken], authController.changeAccount)

router.post('/changePassword', [authorizeBearerToken], authController.changePassword)

module.exports = router