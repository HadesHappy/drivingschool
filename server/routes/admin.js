const express = require('express')
const router = express.Router()
const { uploadImage } = require('../middleware/upload')
const adminController = require('../controllers/admin.test.controller')

router.get('/read', adminController.read)
router.get('/read/:id', adminController.readProblems)

router.post('/add', [uploadImage], adminController.add)
router.post('/update/:id', [uploadImage], adminController.update)
router.post('/delete/:id', adminController.deleteTest)

module.exports = router

