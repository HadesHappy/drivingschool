const express = require('express')
const router = express.Router()
const { uploadImage } = require('../middleware/upload')
const adminController = require('../controllers/admin.test.controller')

router.get('/read', adminController.readTests)
router.get('/read/:id', adminController.readProblems)

router.post('/add', [uploadImage], adminController.addTest)
router.post('/update/:id', [uploadImage], adminController.updateTest)
router.post('/delete/:id', adminController.deleteTest)

module.exports = router

