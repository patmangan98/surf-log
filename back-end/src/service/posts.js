const knex = require('../knex')

exports.showPostsByUsername = async (username) => {
  
  const userId = (await knex
  .distinct()
  .from('user')
  .pluck('user_id')
  .where ('username', username))[0]

  const posts = await knex('posts').where('user_id', userId)
  
  return posts
}

exports.createPost = async (post) => {

  const postId = await knex('posts').insert(post)

  return postId
}

exports.deletePost= async (id) => {

  console.log(id)
  const result = await knex('posts')
  .where('post_id', '=', id)
  .del()

  return 
}