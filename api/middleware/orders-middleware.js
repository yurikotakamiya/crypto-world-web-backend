const Order = require('../orders/model')

const validInput = (req, res, next) => {
    const { strategy_id,
        trading_pair,
        order_size,
        order_price,
        order_side } = req.body
    if (!strategy_id ||
        !trading_pair ||
        !order_size ||
        !order_price ||
        !order_side) {
            next({status: 400, message: 'invalid input'})
        } else {
            req.order = {
                user_id: req.params.user_id,
                strategy_id,
                trading_pair,
                order_size,
                order_price,
                order_side
            }
            next() 
        }
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
        changes["strategy_id"] = req.body.strategy_id
    } 
    if (trading_pair != req.body.trading_pair) {
        changes["trading_pair"] = req.body.trading_pair
    }
    if (order_size != req.body.order_size) {
        changes["order_size"] = req.body.order_size
    }
    if (order_price != req.body.order_price) {
        changes["order_price"] = req.body.order_price
    }
    if (order_side != req.body.order_side) {
        changes["order_side"] = req.body.order_side
    }
    
    if (changes != []) {
        req.changes = changes
        next()
    } else {
        next({status: 400, message: 'input valid change'})
    }
}

module.exports = { validInput, existsOrder, compareChange }