const db = require('../../data/db-config')

const getById = id => {
    return db('api_keys').where({user_id: id}).select('*')
}

const getBy = (user_id, exchange_id) => {
    return db('api_keys').where({user_id, exchange_id})
}

const create = async api => {
    await db('api_keys').insert(api)    
    const { user_id } = api
    return getById(user_id)
}

const update = (id, changes) => {
    return db('api_keys')
        .where({user_id: id, exchange_id: changes['exchange_id']})
        .update(changes)
        .then(rows => {
            return getById(id)
        })
}

const remove = async id => {
    const result = await db('api_keys').where({user_id: id}).del()
    return result
}

module.exports = {
    getById,
    getBy,
    create,
    update,
    remove
}