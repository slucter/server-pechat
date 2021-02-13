const express = require('express')
const router = express.Router()
const msgController = require('./../controller/msgController')
const { authorization } = require('../midleware/index')
router 
    .get('/', authorization,msgController.getAllMsg)
    .get('/chat', authorization ,msgController.privateChat)
    .post('/', authorization, msgController.createMsg)

module.exports = router