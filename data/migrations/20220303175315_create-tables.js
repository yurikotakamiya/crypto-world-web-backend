
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('user_id')
    tbl.string('username', 64).notNullable()
    tbl.string('password', 64).notNullable()
    tbl.string('email', 64).notNullable()
  })
  .createTable('secret_keys', tbl => {
    tbl.integer('user_id')
        .unsigned()    
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    tbl.string('secret_key').notNullable()
    tbl.dateTime('expiration').notNullable()
  })
  .createTable('strategies', tbl => {
      tbl.increments('strategy_id')
      tbl.string('strategy_name', 64).notNullable()
      tbl.text('description').notNullable()
  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('secret_keys')
    .dropTableIfExists('users')
    .dropTableIfExists('strategies')

};
