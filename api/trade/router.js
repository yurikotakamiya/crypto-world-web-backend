const Trade = require('./model')
const router = require('express').Router()
const { validInput,
        existsTrade,
        compareChange
        } = require('../middleware/trades-middleware')

router.post('/send/:user_id', validInput, (req, res, next) => {
    Trade.create(req.trade)
        .then(trade => { res.json(trade) })
        .catch(e => next(e))
})

router.get('/confirm/:trade_id', existsTrade, (req, res, next) => {
    res.json(req.trade)
})

router.post('/modify/:trade_id', existsTrade, compareChange, (req, res, next) => {
    console.log('here')
    Trade.update(req.params.order_id, req.changes)
        .then(trade => { res.json(trade) })
        .catch(e => next(e))
})

router.post('/cancel/:trade_id', existsTrade, (req, res, next) => {
    Trade.remove(req.params.order_id)
        .then(trade => { res.json(trade) })
        .catch(e => next(e))
})

module.exports = router