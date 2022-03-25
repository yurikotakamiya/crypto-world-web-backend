exports.seed = function(knex) {
  return knex('order_states').del()
    .then(function() {
      return knex('order_states').insert([
        {order_state_id: 1, description: 'submit'},
        {order_state_id: 2, description: 'submitted'},
        {order_state_id: 3, description: 'cancel'},
        {order_state_id: 4, description: 'canceled'},
        {order_state_id: 6, description: 'executed'},
      ]);
    })
};