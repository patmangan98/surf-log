const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export const login = async (data) => {
  
  const {
    username,
    password
  } = data

  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: new Headers({
      "Authorization": `Basic ${btoa(`${username}:${password}`)}` //btoa is only deprecated in Node.js not in browser environments!
    }),
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`Status Code: ${response?.status} - ${responseData?.message}`)
  }

  return responseData
}

export const register = async(data) => {

  console.log(data)
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST", 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`Status Code: ${response?.status} - ${responseData?.message}`)
  }

  return responseData
}

export const getUserProfile = async (username) => {

  console.log(`${baseUrl}/user/${username}`)
  const response = await fetch(`${baseUrl}/user/username/${username}`, {
    method: "GET",
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`Status Code: ${response?.status} - ${responseData?.message}`)
  }

  return responseData
}

export const getUser = async(token) => {

  const response = await fetch(`${baseUrl}/user/token`, {
    method: "GET", 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`Status Code: ${response?.status} - ${responseData?.message}`)
  }
  
  return responseData
}

export const updatePassword = async(token, data) => {

  const response = await fetch(`${baseUrl}/auth/updatePassword`, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`Status Code: ${response?.status} - ${responseData?.message}`)
  }
  
  return responseData
}

export const addNewPost = async(post) => {

  console.log(post)
  
  const response = await fetch(`${baseUrl}/post/newpost`, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`Status Code: ${response?.status} - ${responseData?.message}`)
  }
  
  return responseData
}

export const deletePost= async (id) => {

  const response = await fetch(`${baseUrl}/post/${id}`, {
    method: "DELETE",
  })

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    )
  }

  return responseData
}

export const getPosts = async (username) => {

  console.log(`${baseUrl}/user/${username}`)
  const response = await fetch(`${baseUrl}/posts/${username}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`Status Code: ${response?.status} - ${responseData?.message}`)
  }

  return responseData
}

export const updatePost = async(post) => {


    console.log(post);
  
    const response = await fetch(`${baseUrl}/post/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(post),
    })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`Status Code: ${response?.status} - ${responseData?.message}`)
  }
  
  return responseData
}