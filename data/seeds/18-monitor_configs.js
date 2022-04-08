exports.seed = function(knex) {
  return knex('monitor_configs').del()
    .then(function() {
      return knex('monitor_configs').insert([
        { user_id: 1, 
          exchange_id: 1, 
          trading_pair_id: 2, 
          monitor_id: 1,
          param_rsi_low_threshold:10,
          param_rsi_high_threshold: 100,
          param_rsi_time_interval: 1,
        },
      ]);
    })
};