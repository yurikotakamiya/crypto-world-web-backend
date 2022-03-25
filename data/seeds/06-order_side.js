exports.seed = function(knex) {
  return knex('order_sides').del()
    .then(function() {
      return knex('order_sides').insert([
        {order_side_id: 1, description: 'buy'},
        {order_side_id: 2, description: 'sell'},
        {order_side_id: 3, description: 'sell-short'},
    ]);

    })
    
};
