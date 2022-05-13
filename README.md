# URL for this application
Crypto World: [https://crypto-world-inky.vercel.app/](https://crypto-world-inky.vercel.app/)

# Endpoints
### For user information
- [ ] `/api/user/register`
- [ ] `/api/user/login`
- [ ] `/api/user/user_info`
- [ ] `/api/user/change_username`
- [ ] `/api/user/change_email`
- [ ] `/api/user/change_password`
- [ ] `/api/user/logout`

### For order information
- [ ] `/api/order/send/:user_id`
- [ ] `/api/order/history`
- [ ] `/api/order/confirm/:order_id`
- [ ] `/api/order/modify/:order_id`
- [ ] `/api/order/cancel/:order_id`

### For trade information
- [ ] `/api/trade/send/:user_id`
- [ ] `/api/trade/confirm/:trade_id`
- [ ] `/api/trade/history`
- [ ] `/api/trade/modify/:trade_id`
- [ ] `/api/trade/cancel/:trade_id`

### For setting external exchange's api
- [ ] `/api/apis/send`
- [ ] `/api/apis/confirm`
- [ ] `/api/apis/edit/:exchange_id`
- [ ] `/api/apis/modify`
- [ ] `/api/apis/delete`

### For setting strategy configurations
- [ ] `/api/strategy/get_exchange`
- [ ] `/api/strategy/get_trading_pair`
- [ ] `/api/strategy/get_strategy`
- [ ] `/api/strategy/send`
- [ ] `/api/strategy/get_strategy_configs`
- [ ] `/api/strategy/edit`
- [ ] `/api/strategy/delete`

### For setting monitor configurations
- [ ] `/api/monitor/send`
- [ ] `/api/monitor/get_exchange`
- [ ] `/api/monitor/get_monitor_configs`
- [ ] `/api/monitor/get_monitors`
- [ ] `/api/monitor/get_interval`
- [ ] `/api/monitor/edit`
- [ ] `/api/monitor/delete`