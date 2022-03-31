const db = require('../../data/db-config')

const getById = id => {
    return db('trades').where({trade_id: id}).first()
}

const getBy = filter => {
    return db('trades').where(filter).first()
}
const getHistory = async filter => {
    const result = 
    await db('trades as t')
    .leftJoin('trading_pairs as tp', 'tp.trading_pair_id', 't.trading_pair_id')    
    .leftJoin('order_sides as osi', 'osi.order_side_id', 't.trade_side_id')    
    .leftJoin('order_types as ot', 'ot.order_type_id', 't.trade_type_id')
    .leftJoin('strategies as ts', 'ts.strategy_id', 't.strategy_id')
    .where(filter)
    .select('t.trade_id', 
            't.user_id', 
            't.execution_time',
            't.trade_price',
            't.trade_size',        
            'tp.description as trading_pair',             
            'osi.description as trade_side',            
            'ot.description as trade_type',
            'ts.strategy_name as strategy' )
            console.log('here', result, filter)
    return result
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
    remove,
    getHistory
}