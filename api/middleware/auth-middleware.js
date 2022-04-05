const Users = require('../users/model')

function restricted(req, res, next) {
  const { sid } = req.headers
  if (sid) {
    Users.sessionCheck(sid)
    .then(res => {
        if (res) {
          next()
        } else {
          next({status: 401, message: 'You shall not pass!'})    
        }
      })
      .catch(e => next(e))
  }    
}

module.exports = { restricted }