exports.seed = function(knex) {
  return knex('monitors').del()
    .then(function () {
      return knex('monitors').insert([
        {monitor_id: 1, monitor_name: 'RSI', description: 'Relative strength index'},
      ]);
    });
};
