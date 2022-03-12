exports.seed = function(knex) {
  return knex('trades').del()
    .then(function () {
      return knex('trades').insert([
        {user_id: 1, strategy_id: 1, trading_pair: 'BTCUSDT', trade_size: 1.5, trade_price: 39561.90, trade_side: 'buy'}
      ])
    })
};
