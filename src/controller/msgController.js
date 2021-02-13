const  knex  = require('../config/connect')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { response } = require('../helper/index')
const { v4 : uuidv4 } = require('uuid')

module.exports = {
    createMsg : async (req, res) => {
        const body  = req.body
        const create = await knex('Message').insert(body)
        return response(res, 200, create, null)
    },
    getAllMsg : async (req, res) => {
        try {
            const get =  await knex('Message').select('*')
            return response(res, 200, get, null)
        } catch (error) {
            console.log(error.message);
            return response(res, 500, error.message, null)
        }
    },
    privateChat : async (req, res) => {
        try {
            const sender = req.query.sender
            const receiver = req.query.receiver
            const get = await knex('Message')
            .where({sender: sender, receiver: receiver})
            .orWhere({sender: receiver, receiver: sender})
            .select('*')
            return response(res, 200, get, null)
        } catch (error) {
            console.log(error.message);
            return response(res, 500, error.message, null)
        }
    }
}