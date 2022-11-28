const express = require('express')
const router = express.Router()
const {authorizeBearerToken} = require('../middleware/auth.middleware')
const historyController = require('../controllers/history.controller')

// router.get('/read', questionController.read);
// router.get('/read/:id', questionController.readTest);
// router.get('/readbyId/:id/:name', questionController.readbyId);

// router.get('/readbyName/:name', questionController.readbyName)

router.post('/add', [authorizeBearerToken], historyController.saveHistory);

// router.post('/updateTest/:id', [uploadImage], questionController.updateTest);
// router.post('/deleteTest/:id', questionController.deleteTest)

module.exports = router