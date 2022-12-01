const express = require('express')
const router = express.Router()
const { uploadImage } = require('../middleware/upload')
const { authorizeBearerToken } = require('../middleware/auth.middleware')
const testController = require('../controllers/test.controller')

router.get('/read', testController.readTests);
router.get('/read/:id', testController.readTodoTestProblems);
router.get('/todotest', [authorizeBearerToken], testController.readTodoTest);
router.get('/readbyName/:name', [authorizeBearerToken], testController.readbyName);
router.get('/readbyNameAndId/:id/:name', testController.readbyNameAndId);
router.get('/readStudyByNameAndId/:id/:name', testController.readStudyByNameAndId);

router.post('/add', [uploadImage], testController.addTest);
router.post('/update/:id', [uploadImage], testController.updateTest);
router.post('/delete/:id', testController.deleteTest);

module.exports = router

