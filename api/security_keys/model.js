const db = require('../../data/db-config')

const getById = id => {
    return db('security_keys').where({user_id: id}).first()
}

const getBy = filter => {
    return db('security_keys').where(filter).first()
}

const create = async newKey => {
    const { user_id } = await db('security_keys').insert(newKey)
    return getById(user_id)
}

const update = (id, changes) => {
    return db('security_keys')
        .where({user_id: id})
        .update(changes)
        .then(rows => {
            return getById(id)
        })
}

const remove = id => {
    const result = await db('security_keys').where({user_id: id}).del()
    return result
}

module.exports = {
    getById,
    getBy,
    create,
    update,
    remove
}