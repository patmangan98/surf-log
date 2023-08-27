const { getPostsByUsername, addPost, deletePost } = require('../controller/posts')
const { authenticate } = require('../middleware/authenticate')



const posts = (app) => {
 
  console.log("in the posts router")
  app.get('/post/:username', getPostsByUsername)
  app.post('/post/newpost', authenticate, addPost)
  app.delete('/post/id/:id', deletePost)

}

module.exports = posts     