// import routes
const root = require('./root')
const auth = require('./auth')
const user = require('./user')
const posts = require('./posts')



const router = (app) => {

  root(app)
  auth(app)
  user(app)
  posts(app)
}

module.exports = router