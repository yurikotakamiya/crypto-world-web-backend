const Strategy = require('./model')
const Api = require('../api_secret_keys/model')
const router = require('express').Router()
// const { validInput, 
//         existsApi,
//         compareChange
//         } = require('../middleware/api-key-middleware')
const { restricted } = require('../middleware/auth-middleware')
router.post('/get_exchange', restricted, (req, res, next) => {
    Api.getExchange(req.headers.user_id)
        .then(exchange => res.json(exchange))
        .catch(e => next(e))
})

router.post('/get_trading_pair', (req, res, next) => {
    Strategy.getTradingPair()
        .then(pair => res.json(pair))
        .catch(e => next(e))
})
// router.post('/send', validInput, (req, res, next) => {
//     Api.create(req.api)
//         .then(a => { res.json(a) })
//         .catch(e => next(e))
// })

// router.post('/confirm', existsApi, (req, res, next) => {
//     Api.getById(req.headers.user_id)
//         .then(a => { res.json(a) })
//         .catch(e => next(e))
// })

// router.post('/edit/:exchange_id', existsApi, (req, res, next) => {
//     Api.getBy(req.headers.user_id, req.params.exchange_id)
//         .then(a => { res.json(a)})
//         .catch(e => next(e))
// })

// router.post('/modify', existsApi, compareChange, (req, res, next) => {
//     Api.update(req.headers.user_id, req.changes)
//         .then(api => { res.json(api) })
//         .catch(e => next(e))
// })

module.exports = router