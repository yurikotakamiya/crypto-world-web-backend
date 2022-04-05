exports.seed = function(knex) {
  return knex('order_actions').del()
    .then(function() {
      return knex('order_actions').insert([
        {order_action_id: 1, description: 'SUBMIT'},
        {order_action_id: 2, description: 'SUBMITTED'},
        {order_action_id: 3, description: 'SUBMIT_REJECTED'},
        {order_action_id: 4, description: 'CANCEL'},
        {order_action_id: 5, description: 'CANCELED'},
        {order_action_id: 6, description: 'EXECUTED'},
      ]);
    })
};

