const db = require('../../data/db-config')

const getById = id => {
    return db('orders').where({order_id: id}).first()
}

const getBy = filter => {
    return db('orders').where(filter).first()
}

const create = async order => {
    const [ order_id ] = await db('orders').insert(order)
    return getById(order_id)
}

const update = (id, changes) => {
    return db('orders')
        .where({order_id: id})
        .update(changes)
        .then(rows => {
            return getById(id)
        })
}

const remove = async id => {
    const result = await db('orders').where({order_id: id}).del()
    return result
}

module.exports = {
    getById,
    getBy,
    create,
    update,
    remove
}