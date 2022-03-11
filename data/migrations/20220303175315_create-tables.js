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
  .createTable('orders', tbl => {
      tbl.increments('order_id')
      tbl.integer('user_id')
        .notNullable()
        .references('user_id')
        .inTable('users')
      tbl.integer('strategy_id')
        .notNullable()
        .references('strategy_id')
        .inTable('strategies')
      tbl.string('trading_pair', 10).notNullable()
      tbl.double('order_size').notNullable()
      tbl.double('order_price').notNullable()
      tbl.string('order_side').notNullable()
      tbl.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      tbl.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      tbl.boolean('deleted').defaultsTo(false).notNullable()
      tbl.timestamp('deleted_at')
  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('secret_keys')
    .dropTableIfExists('users')
    .dropTableIfExists('strategies')
    .dropTableIfExists('orders')
};
