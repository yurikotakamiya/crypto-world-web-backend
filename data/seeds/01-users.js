exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {user_id: 1, username: 'testuser', password: 1234, email: '123@gmail.com'}
      ]);
    });
};
