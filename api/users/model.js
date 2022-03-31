const db = require('../../data/db-config')

const getById = id => {
    return db('users').where({user_id: id}).first()
}

const getBy = filter => {
    return db('users').where(filter).first()
}

const create = async user => {
    const [ user_id ] = await db('users').insert(user)
    return getById(user_id)
}

const update = (id, changes) => {
    return db('users')
        .where({user_id: id})
        .update(changes)
        .then(rows => {
            return getById(id)
        })
}

const remove = async id => {
    const result = await db('users').where({user_id: id}).del()
    return result
}

const sessionCheck = async sid => {
    const result = await db('session').where({sid})
    console.log(result)
    if (!result) return false
    else return true
}
module.exports = {
    getById,
    getBy,
    create,
    update,
    remove,
    sessionCheck
}