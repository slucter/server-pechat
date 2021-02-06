const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
router 
    .get('/', userController.getAll)
    .get('/:uuid', userController.getById)
    .post('/', userController.createUser)
    .post('/login', userController.loginUser)
    .patch('/patchProfile/:user', userController.patchUser)

module.exports = router