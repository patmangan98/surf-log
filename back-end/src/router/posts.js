const { getPostsByUserId, addPost, deletePost, updatePost } = require('../controller/posts')
const { authenticate } = require('../middleware/authenticate')

const posts = (app) => {
 
  app.get('/posts/:id', getPostsByUserId)
  app.post('/post/newpost', addPost)
  app.put('/post/', updatePost)
  app.delete('/post/:id', deletePost)

}

module.exports = posts     