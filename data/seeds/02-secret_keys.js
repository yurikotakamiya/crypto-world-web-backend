exports.seed = function(knex) {
  return knex('secret_keys').del()
    .then(function () {
      return knex('secret_keys').insert([
        {user_id: 1, secret_key: 'itissecret', expiration: 'YYYY-MM-DD hh:mm:ss'},
      ]);
    });
};
