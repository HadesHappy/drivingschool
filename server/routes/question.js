const express = require('express')
const router = express.Router()
const { uploadImage } = require('../middleware/upload')
const { authorizeBearerToken } = require('../middleware/auth.middleware')
const questionController = require('../controllers/question.controller')

router.get('/read', questionController.readTests);
router.get('/read/:id', questionController.readTodoTestProblems);
router.get('/todotest', [authorizeBearerToken], questionController.readTodoTest);
router.get('/readbyName/:name', [authorizeBearerToken], questionController.readbyName);
router.get('/readbyId/:id/:name', questionController.readbyId);

router.post('/add', [uploadImage], questionController.addTest);
router.post('/update/:id', [uploadImage], questionController.updateTest);
router.post('/delete/:id', questionController.deleteTest);

module.exports = router