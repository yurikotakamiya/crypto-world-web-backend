exports.seed = function(knex) {
  return knex('api_keys').del()
    .then(function() {
      return knex('api_keys').insert([
        {user_id: 1, exchange_id: 1, api_key: 'some of long string will come here', api_secret_key: 'secret is secret'},
      ]);
    })
};