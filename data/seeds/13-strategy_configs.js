exports.seed = function(knex) {
  return knex('strategy_configs').del()
    .then(function() {
      return knex('strategy_configs').insert([
        {user_id: 1, exchange_id: 1, trading_pair_id: 2, strategy_id: 1, },
      ]);
    })
};