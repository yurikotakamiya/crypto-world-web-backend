exports.seed = function(knex) {
  return knex('strategies').del()
    .then(function () {
      return knex('strategies').insert([
        {strategy_id: 1, strategy_name: 'INTERVAL', description: 'Buy and sell at constant price interval'},
      ]);
    });
};
