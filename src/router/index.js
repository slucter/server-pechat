const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const msgRoute = require('./message')

router 
    .use('/user', userRoute)
    .use('/message', msgRoute)

module.exports = router