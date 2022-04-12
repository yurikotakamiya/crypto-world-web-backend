const router = require('express').Router()
const User = require('./model')
const bcrypt = require('bcryptjs')
const {
    validInput,
    uniqueUsername,
    usernameExists,
    uniqueEmail,
    userIdExists
    } = require('../middleware/users-middleware')
const { restricted } = require('../middleware/auth-middleware')

router.post('/register', validInput, uniqueUsername, uniqueEmail, (req, res, next) => {
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
            message: `welcome back ${req.user.username}`,
            user_id: req.session.user.user_id,
            session: req.session.id
        })
    } else {
        next({status: 404, message: 'invalid credentials'})
    }
})

router.post('/user_info', restricted, (req, res, next) => {
    User.getById(req.headers.user_id)
        .then(user => res.json(user))
        .catch(e => next(e))
})

router.post('/change_username', restricted, uniqueUsername, (req, res, next) => {
    User.update(req.headers.user_id, req.body)
        .then(user => res.json(user))
        .catch(e => next(e))
})

router.post('/change_email', restricted, uniqueEmail, (req, res, next) => {
    User.update(req.headers.user_id, req.body)
        .then(user => res.json(user))
        .catch(e => next(e))
})

router.post('/change_password', restricted, userIdExists, (req, res, next) => {
    const { password, newPass } = req.body
    if (bcrypt.compareSync(password, req.user.password)) {
        const hash = bcrypt.hashSync(newPass, 12)
        User.update(req.headers.user_id, {password: hash})
            .then(result => {
                res.json(result)
            })
            .catch(e => next(e))
    } else {
        next({status:400, message: 'invalid credential'})
    }
})

router.post('/logout', (req, res, next) => {
    if (req.session.user) {
        req.session.destroy(err => {
            if (err) {
                next(err)
            } else {
                res.json({message: 'logged out'})
            }
        })
    } else {
        next({status: 400, message: 'no session data found'})
    }
})

module.exports = router