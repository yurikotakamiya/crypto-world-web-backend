const db = require('../../data/db-config')

const getById = id => {
    return db('secret_keys').where({user_id: id}).select('secret_key').first()
}

const getBy = filter => {
    return db('secret_keys').where(filter).first()
}

const create = async newKey => {
    const { user_id } = await db('secret_keys').insert(newKey)
    return getById(user_id)
}

const update = (id, changes) => {
    return db('secret_keys')
        .where({user_id: id})
        .update(changes)
        .then(rows => {
            return getById(id)
        })
}

const remove = async id => {
    const result = await db('secret_keys').where({user_id: id}).del()
    return result
}

module.exports = {
    getById,
    getBy,
    create,
    update,
    remove
}