exports.seed = function(knex) {
  return knex('candlestick_intervals').del()
    .then(function () {
      return knex('candlestick_intervals').insert([
        {candlestick_interval_id: 1, candlestick_interval_name: 'ONE_MINUTE', description: 'ONE MINUTE'},
        {candlestick_interval_id: 2, candlestick_interval_name: 'THREE_MINUTES', description: 'THREE MINUTES'},
        {candlestick_interval_id: 3, candlestick_interval_name: 'FIVE_MINUTES', description: 'FIVE MINUTES'},
        {candlestick_interval_id: 4, candlestick_interval_name: 'FIFTEEN_MINUTES', description: 'FIFTEEN MINUTES'},
        {candlestick_interval_id: 5, candlestick_interval_name: 'HALF_HOURLY', description: 'HALF HOURLY'},
        {candlestick_interval_id: 6, candlestick_interval_name: 'HOURLY', description: 'HOURLY'},
        {candlestick_interval_id: 7, candlestick_interval_name: 'TWO_HOURLY', description: 'TWO HOURLY'},
        {candlestick_interval_id: 8, candlestick_interval_name: 'FOUR_HOURLY', description: 'FOUR HOURLY'},
        {candlestick_interval_id: 9, candlestick_interval_name: 'SIX_HOURLY', description: 'SIX HOURLY'},
        {candlestick_interval_id: 10, candlestick_interval_name: 'EIGHT_HOURLY', description: 'EIGHT HOURLY'},
        {candlestick_interval_id: 11, candlestick_interval_name: 'TWELVE_HOURLY', description: 'TWELVE HOURLY'},
        {candlestick_interval_id: 12, candlestick_interval_name: 'DAILY', description: 'DAILY'},
        {candlestick_interval_id: 13, candlestick_interval_name: 'THREE_DAILY', description: 'THREE DAILY'},
        {candlestick_interval_id: 14, candlestick_interval_name: 'WEEKLY', description: 'WEEKLY'},
        {candlestick_interval_id: 15, candlestick_interval_name: 'MONTHLY', description: 'MONTHLY'},        
      ]);
    });
};