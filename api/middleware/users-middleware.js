const User = require('../users/model')

const validInput = (req, res, next) => {
    const { username, password, email } = req.body
    if (!username || !password || !email 
        || !username.trim() || !password.trim() || !email.trim()) {
        next({status: 404, message: 'username, password, and email are required'})
    } else { next() }
}

const uniqueUsername = (req, res, next) => {
    const { username } = req.body
    User.getBy({username})
        .then(user => {
            if (user) {
                next({status: 400, message: 'username is already taken'})
            } else {
                req.user = user
                next()
            }
        })
        .catch(e => next(e))
}

const usernameExists = (req, res, next) => {
    const { username } = req.body
    User.getBy({username})
        .then(user => {
            if (!user) {
                next({status: 400, message: 'username does not exist'})
            } else {
                req.user = user
                next()
            }
        })
        .catch(e => next(e))    
}

module.exports = {
    validInput,
    uniqueUsername,
    usernameExists,
}