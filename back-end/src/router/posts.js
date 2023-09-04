const { getPostsByUsername, addPost, deletePost, updatePost } = require('../controller/posts')
const { authenticate } = require('../middleware/authenticate')

const posts = (app) => {
 
  app.get('/posts/:username', getPostsByUsername)
  app.post('/post/newpost', authenticate, addPost)
  app.put('/post/', updatePost)
  app.delete('/post/:id', deletePost)

}

module.exports = posts     