const db = require('../../data/db-config')

const getById = id => {
    return db('strategy_configs as sc').where({user_id: id})
            .leftJoin('exchanges as ex', 'sc.exchange_id', 'ex.exchange_id')        
            .leftJoin('strategies as st', 'sc.strategy_id', 'st.strategy_id')
            .leftJoin('trading_pairs as tp', 'sc.trading_pair_id', 'tp.trading_pair_id')
            .select('*', 'ex.description as exchange_name',
                    'st.description as strategy_detail',
                    'tp.description as trading_pair',
                    'sc.exchange_id',
                    'sc.strategy_id',
                    'sc.trading_pair_id'
                    
                    )
}

const getBy = filter => {
    return db('strategy_configs').where(filter).first()
}

const getTradingPair = () => {
    return db('trading_pairs')
            .select('trading_pair_id', 'description as trading_pair_name')
}

const getStrategy = () => {
    return db('strategies')
            .select('*')
}

const create = async strategy => {
    await db('strategy_configs').insert(strategy)
    let { user_id, strategy_id, exchange_id, trading_pair_id } = strategy
    return getBy({user_id, exchange_id, trading_pair_id, strategy_id})
}

const update = (filter, changes) => {
    return db('strategy_configs')
        .where(filter)
        .update(changes)
        .then(rows => {
            return getBy(filter)
        })
}

const remove = async filter => {
    const result = await db('strategies').where(filter).del()
    return result
}

module.exports = {
    getById,
    getBy,
    create,
    update,
    remove,
    getTradingPair,
    getStrategy
}