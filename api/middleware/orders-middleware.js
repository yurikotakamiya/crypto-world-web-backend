const Order = require('../orders/model')

const validInput = (req, res, next) => {
    if (!req.body.strategy_id || !req.body.strategy_id.trim() ||
        !req.body.trading_pair || !req.body.trading_pair.trim() ||
        !req.body.order_size || !req.body.order_size.trim() ||
        !req.body.order_price || !req.body.order_price.trim() ||
        !req.body.order_side || !req.body.order_side.trim()) {
            next({status: 400, message: 'invalid input'})
        } else { next() }
}

const existsOrder = (req, res, next) => {
    Order.getById(req.params.order_id)
        .then(order => {
            if (order) {
                req.order = order
                next()
            } else { next({status: 404, message: 'order not found'}) }
        })
        .catch(e => next(e))
}

const compareChange = (req, res, next) => {
    const { strategy_id, 
            trading_pair, 
            order_size, 
            order_price, 
            order_side } = req.order
    let changes = []
    if (strategy_id != req.body.strategy_id) {
        changes.push({strategy_id: req.body.strategy_id})
    } 
    if (trading_pair != req.body.trading_pair) {
        changes.push({trading_pair: req.body.trading_pair})
    }
    if (order_size != req.body.order_size) {
        changes.push({order_size: req.body.order_size})
    }
    if (order_price != req.body.order_price) {
        changes.push({order_price: req.body.order_price})
    }
    if (order_side != req.body.order_side) {
        changes.push({order_side: req.body.order_side})
    }
    
    if (changes != []) {
        req.changes = changes
        next()
    } else {
        next({status: 400, message: 'input valid change'})
    }
}

module.exports = { validInput, existsOrder, compareChange }