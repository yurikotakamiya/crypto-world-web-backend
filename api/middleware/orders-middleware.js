const Order = require('../orders/model')

const validInput = (req, res, next) => {
    const { strategy_id,
            trading_pair_id,
            order_size,
            order_price,
            order_side_id,
            order_action_id,
            order_state_id,
            order_leaves_quantity,
            order_type_id,
            version } = req.body
    if (!strategy_id ||
        !trading_pair_id ||
        !order_size ||
        !order_price ||
        !order_side_id ||
        !order_action_id ||
        !order_state_id ||
        !order_leaves_quantity ||
        !order_type_id ||
        !version
        ) {
            next({status: 400, message: 'invalid input'})
        } else {
            req.order = {
                user_id: req.params.user_id,
                strategy_id,
                trading_pair_id,
                order_size,
                order_price,
                order_side_id,
                order_action_id,
                order_state_id,
                order_leaves_quantity,
                order_type_id,
                version
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
            trading_pair_id, 
            order_size, 
            order_price, 
            order_side_id,
            order_action_id,
            order_state_id,
            order_leaves_quantity,
            order_type_id,
            version } = req.order
    let changes = []
    if (strategy_id != req.body.strategy_id) {
        changes["strategy_id"] = req.body.strategy_id
    } 
    if (trading_pair_id != req.body.trading_pair_id) {
        changes["trading_pair_id"] = req.body.trading_pair_id
    }
    if (order_size != req.body.order_size) {
        changes["order_size"] = req.body.order_size
    }
    if (order_price != req.body.order_price) {
        changes["order_price"] = req.body.order_price
    }
    if (order_side_id != req.body.order_side_id) {
        changes["order_side_id"] = req.body.order_side_id
    }
    if (order_action_id != req.body.order_action_id) {
        changes["order_action_id"] = req.body.order_action_id
    }
    if (order_state_id != req.body.order_state_id) {
        changes["order_state_id"] = req.body.order_state_id
    }
    if (order_leaves_quantity != req.body.order_leaves_quantity) {
        changes["order_leaves_quantity"] = req.body.order_leaves_quantity
    }
    if (order_type_id != req.body.order_type_id) {
        changes["order_type_id"] = req.body.order_type_id
    }
    if (version != req.body.version) {
        changes["version"] = req.body.version
    }
    if (changes != []) {
        req.changes = changes
        next()
    } else {
        next({status: 400, message: 'input valid change'})
    }
}

module.exports = { validInput, existsOrder, compareChange }