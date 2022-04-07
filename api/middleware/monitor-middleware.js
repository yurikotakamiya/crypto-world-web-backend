const Monitor = require('../monitors/model')

const validInput = (req, res, next) => {
    let { user_id } = req.headers
    user_id = parseInt(user_id)
    const { exchange_id,
            trading_pair_id,
            monitor_id,
            param_rsi_low_threshold,
            param_rsi_high_threshold } = req.body
    if (monitor_id == 1) {
        if (!param_rsi_low_threshold ||
            !param_rsi_high_threshold ||            
            !exchange_id ||
            !trading_pair_id ||
            !monitor_id) {
                next({status: 400, message: 'invalid input'})
        } else {
            req.monitor = {
                user_id,
                exchange_id,
                trading_pair_id,
                monitor_id,
                param_rsi_low_threshold,
                param_rsi_high_threshold
            }
            next() 
        }        
    }
}

const existsConfig = (req, res, next) => {
    const { user_id, exchange_id, trading_pair_id, monitor_id } = req.body
    Monitor.getBy({user_id, exchange_id, trading_pair_id, monitor_id})
        .then(s => {
            if (s) {                
                next()
            } else { next({status: 404, message: 'monitor config was not found'}) }
        })
        .catch(e => next(e))
}

module.exports = { validInput, existsConfig }