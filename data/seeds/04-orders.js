exports.seed = async function(knex) {
  return knex('orders').del()
    .then(function () {
      return knex('orders').insert([
        {user_id: 1, strategy_id: 1, trading_pair: 'BTCUSDT', order_size: 1.5, order_price: 39561.90, order_side: 'buy'}
      ])
    })
};
