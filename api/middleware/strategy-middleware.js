const Strategy = require('../strategies/model')

const validInput = (req, res, next) => {
    let { user_id } = req.headers
    user_id = parseInt(user_id)
    const { exchange_id,
        trading_pair_id,
            strategy_id } = req.body
    const { param_interval_order_size,
            param_interval_price_interval,
            param_interval_profit_price_change,
            param_interval_start_price } = req.body
    if (strategy_id == 1) {
        if (!param_interval_order_size ||
            !param_interval_price_interval ||
            !param_interval_profit_price_change ||
            !param_interval_start_price ||
            !exchange_id ||
            !trading_pair_id ||
            !strategy_id) {
                next({status: 400, message: 'invalid input'})
        } else {
            req.strategy = {
                user_id,
                exchange_id,
                trading_pair_id,
                strategy_id,
                param_interval_order_size,
                param_interval_price_interval,
                param_interval_profit_price_change,
                param_interval_start_price,
            }
            next() 
        }        
    }
}

const existsConfig = (req, res, next) => {
    const { user_id, exchange_id, trading_pair_id, strategy_id } = req.strategy
    Strategy.getBy({user_id, exchange_id, trading_pair_id, strategy_id})
        .then(s => {
            if (s) {                
                next()
            } else { next({status: 404, message: 'strategy config was not found'}) }
        })
        .catch(e => next(e))
}

const compareChange = (req, res, next) => {    
    const { exchange_id,
            api_key,
            secret_key } = req.api
    let changes = []
    if (exchange_id != req.body.exchange_id) {
        changes["exchange_id"] = req.body.exchange_id
    } 
    if (api_key != req.body.api_key) {
        changes["api_key"] = req.body.api_key
    }
    if (secret_key != req.body.secret_key) {
        changes["secret_key"] = req.body.secret_key
    }
    
    if (changes != []) {
        req.changes = changes
        next()
    } else {
        next({status: 400, message: 'input valid change'})
    }
}

module.exports = { validInput, existsConfig, compareChange }