exports.seed = function(knex) {
  return knex('order_history').del()
    .then(function () {
      return knex('order_history').insert([
        {user_id: 1, strategy_id: 1, trading_pair: 'BTCUSDT', order_size: 1.5, order_price: 39561.90, order_side: 'buy'}
      ])
    })
};
