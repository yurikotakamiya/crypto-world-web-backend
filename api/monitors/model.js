const db = require('../../data/db-config')

const getMonitor = () => {
    return db('monitors').select('*')
}
const getById = id => {
    return db('monitor_configs as sc').where({user_id: id})
            .leftJoin('monitors as m', 'm.monitor_id', 'sc.monitor_id')
            .leftJoin('exchanges as ex', 'sc.exchange_id', 'ex.exchange_id')        
            .leftJoin('trading_pairs as tp', 'sc.trading_pair_id', 'tp.trading_pair_id')
            .select('*',
                    'm.monitor_name',
                    'ex.description as exchange_name',
                    'tp.description as trading_pair',               
                    )
}

const getExchange = () => {
    return db('exchanges')
            .select('*')
}

const getBy = filter => {
    return db('monitor_configs').where(filter).first()
}

const create = async config => {
    await db('monitor_configs').insert(config)
    let { user_id, monitor_id, exchange_id, trading_pair_id } = config
    return getBy({user_id, exchange_id, trading_pair_id, monitor_id})
}

const update = (filter, changes) => {
    return db('monitor_configs')
        .where(filter)
        .update(changes)
        .then(rows => {
            return getBy(filter)
        })
}

const remove = async filter => {
    const result = await db('monitor_configs').where(filter).del()
    return result
}

module.exports = {
    getById,
    getBy,
    getMonitor,
    getExchange,
    create,
    update,
    remove,
}