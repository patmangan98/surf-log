// import routes
const root = require('./root')
const auth = require('./auth')


const router = (app) => {

  root(app)
  auth(app)
}

module.exports = router