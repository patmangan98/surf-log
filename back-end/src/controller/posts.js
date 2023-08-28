const { showPostsByUsername, createPost, deletePost } = require('../service/posts')

exports.getPostsByUsername = async (req, res) => {
  
  try {
    const posts = await showPostsByUsername(req.params.username)
    
    res.json(posts)
    

  } catch (error) {

    console.error(error)
    res.status(500).send("Internal Server Error")
  }
}

exports.addPost = async (req, res) => {

  console.log(req.body)

  const post = req.body
 
  try {
    
    const result = await createPost(post)
    
    res.json(result)

  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }

}

exports.deletePost = async (req, res) => {   
  
  console.log('made it to the controller on delete')
  try {
    
    console.log(req.params)
    const update = await deletePost(req.params.id)
   
    return res.json({message: "Post was deleted."})

  } catch (error) {
    console.log(error)
  }
}