const Strategy = require('./model')
const Api = require('../api_secret_keys/model')
const router = require('express').Router()
const { validInput,
        existsConfig,
        } = require('../middleware/strategy-middleware')
const { restricted } = require('../middleware/auth-middleware')
router.post('/get_exchange', restricted, (req, res, next) => {
    Api.getExchange(req.headers.user_id)
        .then(exchange => res.json(exchange))
        .catch(e => next(e))
})

router.get('/get_trading_pair', (req, res, next) => {
    Strategy.getTradingPair()
        .then(pair => res.json(pair))
        .catch(e => next(e))
})

router.get('/get_strategy', (req, res, next) => {
    Strategy.getStrategy()
        .then(s => res.json(s))
        .catch(e => next(e))
})
router.post('/send', validInput, (req, res, next) => {
    Strategy.create(req.strategy)
        .then(s => res.json(s))
        .catch(e => next(e))
})

router.post('/get_strategy_configs', restricted, (req, res, next) => {
    Strategy.getById(req.headers.user_id)
        .then(s => { res.json(s) })
        .catch(e => next(e))
})

router.post('/edit', restricted, validInput, existsConfig,  (req, res, next) => {
    const { user_id, exchange_id, trading_pair_id, strategy_id } = req.strategy
    const filter = {user_id, exchange_id, trading_pair_id, strategy_id}
    Strategy.update(filter, req.strategy)
        .then(s => { res.json(s)})
        .catch(e => next(e))
})

// router.post('/modify', existsApi, compareChange, (req, res, next) => {
//     Api.update(req.headers.user_id, req.changes)
//         .then(api => { res.json(api) })
//         .catch(e => next(e))
// })

module.exports = router