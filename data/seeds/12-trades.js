exports.seed = function(knex) {
  return knex('trades').del()
    .then(function () {
      return knex('trades').insert([
        { trade_id: 1, 
          user_id: 1, 
          strategy_id: 1, 
          trading_pair_id: 1, 
          trade_size: 1.5, 
          trade_price: 39561.90, 
          trade_side_id: 1, 
          trade_type_id: 1, 
        }
      ])
    })
};
