exports.seed = function(knex) {
  return knex('trading_pairs').del()
    .then(function() {
      return knex('trading_pairs').insert([
        {trading_pair_id: 1, description: 'BTCUSDT'},
        {trading_pair_id: 2, description: 'ETHUSDT'},
        {trading_pair_id: 3, description: 'BTCPERP'},
        {trading_pair_id: 4, description: 'ETHPERP'},
      ]);
    })
};