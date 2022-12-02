const express = require('express')
const router = express.Router()
const { authorizeBearerToken } = require('../middleware/auth.middleware')
const testController = require('../controllers/test.controller')

router.get('/readTestData/:category', [authorizeBearerToken], testController.readTestData)
router.get('/readExamData/:id/:category', testController.readExamData)
router.get('/readStudyData/:id/:category', testController.readStudyData)
router.get('/readResult/:id/:category', testController.readLiveResults)

module.exports = router

