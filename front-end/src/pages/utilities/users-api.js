import { getToken } from "./users-service";

// const BASE_URL = '/api/users'
const baseUrl = 'http://localhost:8000'

//should have signUp, login, maybe send request


export const register = async(data) => {

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

// export default async function sendRequest(url, method='GET', payload=null) {
//     const options = { method }
//     if (payload) {
//         // set headers for content if there's a payload
//         options.headers = { 'Content-Type': 'application/json'}
//         options.body = JSON.stringify(payload)
//     }
//     // if there's token, include it in the request
//     const token = getToken()
//     if (token) {
//         // make sure we have headers on our options
//         options.headers = options.headers || {}
//         // add in our token with an Authorization header
//         options.headers.Authorization = `Bearer ${token}`
//         // make sure you capitalize Authorization
//         // best practice is to begin with "Bearer "
//     }
//     const res = await fetch(url, options)
//     if (res.ok) {
//         return res.json()
//     } else {
//         throw new Error('Bad Request')
//     }
// }

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