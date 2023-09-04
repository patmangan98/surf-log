const { showPostsByUsername, createPost, deletePost, updatePost } = require('../service/posts')

exports.getPostsByUserId = async (req, res) => {
  
  try {
    const posts = await showPostsByUsername(req.params.username)
    
    res.json(posts)
    

  } catch (error) {

    console.error(error)
    res.status(500).send("Internal Server Error")
  }
}

exports.getPostsByUsername = async (req, res) => {
  
  console.log(req.params.username)
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
  
  try {
    
    const update = await deletePost(req.params.id)
   
    return res.json({message: "Post was deleted."})

  } catch (error) {
    console.log(error)
  }
}

exports.updatePost = async (req, res) => {   
  
  try {
  
    const update = await updatePost(req.body)
   
    return res.json({message: "Post was updated."})

  } catch (error) {
    console.log(error)
  }
}