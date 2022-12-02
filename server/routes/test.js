const express = require('express')
const router = express.Router()
const { authorizeBearerToken } = require('../middleware/auth.middleware')
const testController = require('../controllers/test.controller')

router.get('/readStudy/:id', testController.readTodoStudyProblems)
router.get('/todotest', [authorizeBearerToken], testController.readTodoTest)
router.get('/readbyName/:name', [authorizeBearerToken], testController.readbyName)
router.get('/readbyNameAndId/:id/:name', testController.readbyNameAndId)
router.get('/readStudyByNameAndId/:id/:name', testController.readStudyByNameAndId)

router.get('/readTestData/:category', [authorizeBearerToken], testController.readTestData)
router.get('/readExamData/:id/:category', testController.readExamData)
router.get('/readStudyData/:id/:category', testController.readStudyData)
router.get('/readResult/:id/:category', testController.readLiveResults)

module.exports = router

