exports.up = function(knex) {
  return knex.schema.createTable('orders', tbl => {
    tbl.increments('order_id')
    tbl.integer('strategy_id')
      .notNullable()
      .references('strategy_id')
      .inTable('strategies')
    tbl.string('trading_pair', 10).notNullable()
    tbl.double('order_size').notNullable()
    tbl.double('order_price').notNullable()
    tbl.string('order_side').notNullable()
    tbl.dateTime('time').notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists()
};
