exports.seed = function(knex) {
  return knex('order_actions').del()
    .then(function() {
      return knex('order_actions').insert([
        {order_action_id: 1, description: 'submit'},
        {order_action_id: 2, description: 'submitted'},
        {order_action_id: 3, description: 'cancel'},
        {order_action_id: 4, description: 'canceled'},
        {order_action_id: 5, description: 'execute'},
        {order_action_id: 6, description: 'executed'},
      ]);
    })
};
