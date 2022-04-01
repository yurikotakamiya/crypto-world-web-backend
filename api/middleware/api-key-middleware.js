const Api = require('../api_secret_keys/model')

const validInput = (req, res, next) => {
    const { exchange_id,
            api_key,
            secret_key } = req.body
    const { user_id } = req.headers
    if (!exchange_id ||
        !api_key ||
        !secret_key) {
            next({status: 400, message: 'invalid input'})
        } else {
            req.api = {
                user_id,
                exchange_id,
                api_key,
                secret_key
            }
            next() 
        }
}

const existsApi = (req, res, next) => {
    Api.getById(req.headers.user_id)
        .then(a => {
            if (a) {
                req.api = a
                next()
            } else { next({status: 404, message: 'trade not found'}) }
        })
        .catch(e => next(e))
}

const compareChange = (req, res, next) => {    
    const { exchange_id,
            api_key,
            secret_key } = req.api
    let changes = []
    if (exchange_id != req.body.exchange_id) {
        changes["exchange_id"] = req.body.exchange_id
    } 
    if (api_key != req.body.api_key) {
        changes["api_key"] = req.body.api_key
    }
    if (secret_key != req.body.secret_key) {
        changes["secret_key"] = req.body.secret_key
    }
    
    if (changes != []) {
        req.changes = changes
        next()
    } else {
        next({status: 400, message: 'input valid change'})
    }
}

module.exports = { validInput, existsApi, compareChange }