const Trade = require('../trades/model')

const validInput = (req, res, next) => {
    const { strategy_id,
        trading_pair,
        trade_size,
        trade_price,
        trade_side } = req.body
    if (!strategy_id ||
        !trading_pair ||
        !trade_size ||
        !trade_price ||
        !trade_side) {
            next({status: 400, message: 'invalid input'})
        } else {
            req.trade = {
                user_id: req.params.user_id,
                strategy_id,
                trading_pair,
                trade_size,
                trade_price,
                trade_side
            }
            next() 
        }
}

const existsTrade = (req, res, next) => {
    Trade.getById(req.params.trade_id)
        .then(trade => {
            if (trade) {
                req.trade = trade
                next()
            } else { next({status: 404, message: 'trade not found'}) }
        })
        .catch(e => next(e))
}

const compareChange = (req, res, next) => {
    const { strategy_id, 
            trading_pair, 
            trade_size, 
            trade_price, 
            trade_side } = req.trade
    let changes = []
    if (strategy_id != req.body.strategy_id) {
        changes["strategy_id"] = req.body.strategy_id
    } 
    if (trading_pair != req.body.trading_pair) {
        changes["trading_pair"] = req.body.trading_pair
    }
    if (trade_size != req.body.trade_size) {
        changes["trade_size"] = req.body.trade_size
    }
    if (trade_price != req.body.trade_price) {
        changes["trade_price"] = req.body.trade_price
    }
    if (trade_side != req.body.trade_side) {
        changes["trade_side"] = req.body.trade_side
    }
    
    if (changes != []) {
        req.changes = changes
        next()
    } else {
        next({status: 400, message: 'input valid change'})
    }
}

module.exports = { validInput, existsTrade, compareChange }