require('dotenv').config()
const express = require('express')
const server = express()
const userRoute = require('../api/users/route')
const orderRoute = require('../api/orders/router')
const session = require('express-session')
const Store = require('connect-session-knex')(session)
const knex = require('../data/db-config')

const sessionConfig = {
    name: 'cww_session',
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({
        knex,
        createTable: true,
        clearInterval: 1000 * 60 * 10,
        tableName: 'session',
        sidfieldName: 'sid'
    })
}

server.use(session(sessionConfig))

server.use(express.json())

server.use('/api/user', userRoute)
server.use('/api/order', orderRoute)

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.message
    })
})

module.exports = server