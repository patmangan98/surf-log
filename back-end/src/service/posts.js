const knex = require('../knex')

exports.showPostsByUserId = async (userId) => {
  
  const posts = await knex('posts').where('user_id', userId)
  
  return posts
}

exports.createPost = async (post) => {

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