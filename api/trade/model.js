const db = require('../../data/db-config')

const getById = id => {
    return db('trades').where({trade_id: id}).first()
}

const getBy = filter => {
    return db('trades').where(filter).first()
}

const create = async trade => {
    const [ trade_id ] = await db('trades').insert(trade)
    return getById(trade_id)
}

const update = (id, changes) => {
    return db('trades')
        .where({trade_id: id})
        .update(changes)
        .then(rows => {
            return getById(id)
        })
}

const remove = async id => {
    const result = await db('trades')
                        .where({trade_id: id})
                        .returning('deleted')
                        .update({
                            deleted: true,
                            deleted_at: new Date()
                        })
    return result
}

module.exports = {
    getById,
    getBy,
    create,
    update,
    remove
}