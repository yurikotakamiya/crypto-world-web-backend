exports.seed = function(knex) {
  return knex('order_states').del()
    .then(function() {
      return knex('order_states').insert([
        {order_state_id: 1, description: 'SUBMIT'},
        {order_state_id: 2, description: 'SUBMITTED'},
        {order_state_id: 3, description: 'SUBMIT_REJECTED'},
        {order_state_id: 4, description: 'CANCEL'},
        {order_state_id: 5, description: 'CANCELED'},
        {order_state_id: 6, description: 'PARTIAL_EXEC'},
        {order_state_id: 7, description: 'EXECUTED'},
      ]);
    })
};
