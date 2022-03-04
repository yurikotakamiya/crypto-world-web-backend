const router = require('express').Router()
const User = require('./model')
const bcrypt = require('bcryptjs')
const {
    validInput,
    uniqueUsername,
    usernameExists,
    } = require('../middleware/users-middleware')   

router.post('/register', validInput, uniqueUsername, (req, res, next) => {
    const { username, password, email } = req.body
    const hash = bcrypt.hashSync(password, 12)
    User.create({username, password: hash, email})
        .then(user => {
            res.json(user)
        })
        .catch(e => { next(e) })
})

router.post('/login', usernameExists, (req, res, next) => {
    const { password } = req.body
    if (bcrypt.compareSync(password, req.user.password)) {
        req.session.user = req.user
        res.json({
            message: `welcome back ${req.session.user.username}`,        
        })
    } else {
        next({status: 404, message: 'invalid credentials'})
    }
})

router.post('/password_change', usernameExists, (req, res, next) => {
    const { password, newPass } = req.body
    if (bcrypt.compareSync(password, req.user.password)) {
        const hash = bcrypt.hashSync(newPass, 12)
        User.update(req.user.user_id, hash)
            .then(result => {
                res.json(result)
            })
            .catch(e => next(e))
    } else {
        res.json({message: 'invalid credential'})
    }
})

router.post('/logout', (req, res, next) => {
    if (req.session.user) {
        req.session.user.destroy(err => {
            if (err) {
                next(err)
            } else {
                res.json({message: 'logged out'})
            }
        })
    } else {
        res.json({message: 'no session data found'})
    }
})

module.exports = router