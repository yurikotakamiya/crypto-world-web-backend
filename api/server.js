require('dotenv').config()
const express = require('express')
const server = express()
const userRoute = require('../api/users/route')

const sessionConfig = {
    name: 'cww_session',
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveInitialized: false,
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

server.get('/api/user', userRoute)

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.message
    })
})

module.exports = server