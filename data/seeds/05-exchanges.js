exports.seed = function(knex) {
  return knex('exchanges').del()
    .then(function() {
      return knex('exchanges').insert([
        {exchange_id: 1, description: 'BINANCE'},
        {exchange_id: 2, description: 'KUCOIN'},
        {exchange_id: 3, description: 'FTX'},
      ]);
    })
};