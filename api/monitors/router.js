const Monitor = require('./model')
const router = require('express').Router()
const { validInput,
        existsConfig,
        } = require('../middleware/monitor-middleware')
const { restricted } = require('../middleware/auth-middleware')

router.post('/send', validInput, (req, res, next) => {
    Monitor.create(req.monitor)
        .then(s => res.json(s))
        .catch(e => next(e))
})
router.get('/get_exchange', (req, res, next) => {
    Monitor.getExchange()
        .then(t => res.json(t))
        .catch(e => next(e))
})

router.post('/get_monitor_configs', restricted, (req, res, next) => {
    Monitor.getById(req.headers.user_id)
        .then(s => res.json(s))
        .catch(e => next(e))
})
router.get('/get_monitors', (req, res, next) => {
    Monitor.getMonitor()
        .then(m => res.json(m))
        .catch(e => next(e))
})

router.post('/edit', restricted, validInput, existsConfig,  (req, res, next) => {
    const { user_id, exchange_id, trading_pair_id, monitor_id } = req.monitor
    const filter = {user_id, exchange_id, trading_pair_id, monitor_id}
    Monitor.update(filter, req.monitor)
        .then(s => res.json(s))
        .catch(e => next(e))
})

router.post('/delete', existsConfig, (req, res, next) => {
    const { user_id, exchange_id, trading_pair_id, monitor_id } = req.body
    const filter = {user_id, exchange_id, trading_pair_id, monitor_id}
    Monitor.remove(filter)
        .then(deleted => res.json(deleted))
        .catch(e => next(e))
})

module.exports = router