const  knex  = require('../config/connect')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { response } = require('../helper/index')
const { v4 : uuidv4 } = require('uuid')

module.exports = {
    getAll: async (req, res) => {
        try {
            const not = req.query.not;
            const search = req.query.search;
            if (search) {
                const q = await knex('Users').where('fullname', 'like', `%${search}%`)
                .orWhere('username', 'like', `%${search}%`)
                .orWhere({email: search})
                .select('*')
                return response(res, 200, q, null)
            }
            const q = await knex('Users').whereNot({uuid: not}).select('*')
            return response(res, 200, q, null)
        } catch (error) {
            console.log(error);
        }
    },
    getById: async (req, res) => {
        try {
            const uuid = req.params.uuid
            const user = await knex('Users').where({uuid: uuid}).select('*')
            return response(res, 200, user, null)
        } catch (error) {
            console.log(error.message);
            return response(res, 500, error.message, null)
        }
    },
    createUser: async (req, res) => {
        try {
           const { fullname, username, email, password, phone, longlat, avatar } = req.body
           if(( await knex('Users').select('*').where({email: email})).length > 0 ) {
               return response(res, 200, 'Email Exist', null)
            }
            const salt = await bcrypt.genSalt(10)
            const hashPw = await bcrypt.hash(password, salt)
            const data = { fullname, username, email, password: hashPw, phone, longlat, avatar, uuid: uuidv4() }
            await   knex('Users').insert(data)
            return  response(res, 200, 'Done register', null)
        } catch (error) {
            console.log(error.message);
            return response(res, 500, error.message, null)
        }
    },
    loginUser: async (req, res) => {
        try {
            const body = req.body
            const user = await knex('Users').where({email: body.email}).orWhere({username: body.email})
            if( user.length > 0 ) {
                const compare = await bcrypt.compare(body.password, user[0].password)
                if (compare) {
                    const user_data = user[0]
                    const genToken  = jwt.sign({id: user_data.id, email: user_data.email}, process.env.JWT_KEY)
                    user_data.token = genToken
                    delete user_data.password
                    return  response(res, 200, user_data, null)
                } else {
                    return  response(res, 401, 'Password incorect!', null)
                }
            } else {
                return  response(res, 401, 'Email incorect / Not registered', null)
            }

        } catch (error) {
            console.log(error.message);
            return response(res, 500, error.message, null)
        }
    },
    patchUser: async (req, res) => {
        try {
            const user = req.params.user
            const body = req.body
            const patch = await knex('Users').where({uuid: user}).update(body)
            return response(res, 200, patch, null)
        } catch (error) {
            console.log(error.message);
            return response(res, 500, error.message, null)
        }
    }
}