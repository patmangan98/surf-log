const { showUserByUsername} = require('../service/user')

exports.getUserByUsername= async (req, res) => {
  
  try {

    const userByName = await showUserByUsername(req.params.username)
    
    res.json(userByName)
    
  } catch (error) {

  
    res.status(500).send("Internal Server Error")
  }
}

exports.getUserByToken = async (req, res) => {
  
  try {
    const userByToken = await showUserById(req.userId)
    
    res.json(userByToken)
  
  } catch (error) {

  
    res.status(500).send("Internal Server Error")
  }
}

// exports.getUserById = async (req, res) => {
  
//   try {
//     console.log(req.userId)
//     const userByUserId = await showUserById(req.params.userId)
    
//     res.json(userByUserId)
  
//   } catch (error) {


//     res.status(500).send("Internal Server Error")
//   }
// }