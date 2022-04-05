exports.seed = function(knex) {
  return knex('time_in_forces').del()
    .then(function() {
      return knex('time_in_forces').insert([
        {time_in_force_id: 1, description: 'GTC'},
        {time_in_force_id: 2, description: 'IOC'},
        {time_in_force_id: 3, description: 'FOK'},
      ]);
    })
};