const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const { authorization, upload, validation } = require('../midleware')
router 
    .get('/', authorization,userController.getAll)
    .get('/:uuid', userController.getById)
    .post('/', userController.createUser)
    .post('/login', userController.loginUser)
    .patch('/avatar/', authorization, upload.single('avatar'),validation, userController.avatarUser)
    .patch('/patchProfile/:user',userController.patchUser)

module.exports = router