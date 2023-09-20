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
  console.log(post)
  const postId = await knex('posts').insert(post)

  return postId
}

exports.deletePost= async (id) => {

  const result = await knex('posts')
  .where('post_id', '=', id)
  .del()

  return 
}

exports.updatePost= async (post) => {

  console.log("POSt", post.post_description)
  const result = await knex('posts')
    .where('post_id', post.post_id)
    .update({
      user_id: post.user_id, 
      post_date: post.post_date,
      post_description: post.post_description, 
      post_location: post.post_location,
      WDIR: post.WDIR,
      WSPD: post.WSPD,
      GST: post.GST,
      WVHT: post.WVHT,
      DPD: post.DPD,
      APD: post.APD,
      MWD: post.MWD,
      PRES: post.PRES
    })

  return 
}