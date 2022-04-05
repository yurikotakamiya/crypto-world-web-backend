exports.seed = function(knex) {
  return knex('order_types').del()
    .then(function() {
      return knex('order_types').insert([
        {order_type_id: 1, description: 'MARKET'},
        {order_type_id: 2, description: 'LIMIT'}
      ]);
    })
};