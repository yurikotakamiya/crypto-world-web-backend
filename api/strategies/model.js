const db = require('../../data/db-config')

const getById = id => {
    return db('strategies').where({user_id: id}).first()
}

const getBy = filter => {
    return db('strategies').where(filter).first()
}

const getTradingPair = () => {
    return db('trading_pairs')
            .select('trading_pair_id', 'description as trading_pair_name')
}

const create = async strategy => {
    const { strategy_id } = await db('strategies').insert(strategy)
    return getById(strategy_id)
}

const update = (id, changes) => {
    return db('strategies')
        .where({strategy_id: id})
        .update(changes)
        .then(rows => {
            return getById(id)
        })
}

const remove = async id => {
    const result = await db('strategies').where({strategy_id: id}).del()
    return result
}

module.exports = {
    getById,
    getBy,
    create,
    update,
    remove,
    getTradingPair
}