exports.seed = function(knex) {
  return knex('strategy_configs').del()
    // .then(function() {
    //   return knex('strategy_configs').insert([
    //     { user_id: 1, 
    //       exchange_id: 1, 
    //       trading_pair_id: 2, 
    //       strategy_id: 1,
    //       param_interval_order_size: 2.5,
    //       param_interval_price_interval: 1.5,
    //       param_interval_profit_price_change: 0.5,
    //       param_interval_start_price: 1.2,
    //     },
    //   ]);
    // })
};