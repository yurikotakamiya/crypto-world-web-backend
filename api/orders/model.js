const db = require('../../data/db-config')

const getById = id => {
    return db('orders').where({order_id: id}).first()
}

const getHistory = async filter => {
    const result = 
    await db('orders as o')
    .leftJoin('trading_pairs as tp', 'tp.trading_pair_id', 'o.trading_pair_id')
    .leftJoin('order_actions as oa', 'oa.order_action_id', 'o.order_action_id')
    .leftJoin('order_sides as osi', 'osi.order_side_id', 'o.order_side_id')
    .leftJoin('order_states as ost', 'ost.order_state_id', 'o.order_state_id')
    .leftJoin('order_types as ot', 'ot.order_type_id', 'o.order_type_id')
    .leftJoin('strategies as ts', 'ts.strategy_id', 'o.strategy_id')
    .where(filter)
    .select('o.order_id', 
            'o.user_id', 
            'o.create_time',
            'o.update_time',
            'o.order_leaves_quantity',
            'o.order_price',
            'o.order_size',
            'o.version',
            'tp.description as trading_pair', 
            'oa.description as order_action',
            'osi.description as order_side',
            'ost.description as order_state',
            'ot.description as order_type',
            'ts.strategy_name as strategy' )
    return result
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

module.exports = {
    getById,
    getHistory,
    create,
    update,
}