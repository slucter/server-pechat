const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const { authorization, upload, validation } = require('../midleware')
router 
    .get('/', authorization,userController.getAll)
    .get('/:uuid', userController.getById)
    .post('/', userController.createUser)
    .post('/login', userController.loginUser)
    .patch('/patchProfile/:user',userController.patchUser)
    .patch('/avatar/:uuid',  upload.single('avatar'),validation, userController.avatarUser)

module.exports = router