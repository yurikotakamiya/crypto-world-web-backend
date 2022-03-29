exports.seed = function(knex) {
  return knex('order_history').del()
    .then(function () {
      return knex('order_history').insert([
        { order_id: 1,
          user_id: 1, 
          strategy_id: 1, 
          trading_pair_id: 3, 
          order_size: 1.5, 
          order_price: 39561.90, 
          order_side_id: 3,
          order_action_id: 2,
          order_state_id: 1,
          order_leaves_quantity: 2,
          order_type_id: 1,
          version: 5678,
          }
      ])
    })
};
