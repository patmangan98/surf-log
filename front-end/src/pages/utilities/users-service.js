
// I need in this to have the:
    //sign up function -false
    // get token function - true
    //get user function - true
    // logout function - basically aka clear token
    //login function
    // check token - 
const BASE_URL = ''




export const isUserLoggedIn = () => {
    const token = localStorage.getItem('session_token')
    console.log("Token is " + token)
    return token ? true : false
  }

export const getToken = () => {
    const token = localStorage.getItem('session_token')

    if (!token) return null

    const payload = token.split('.')[1]
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)

    if (parsedPayload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        return null
    } else {
        return token
    }

    
  }

export function getUser() {
    const token = getToken()
    if (token) {
        const payload = token.split('.')[1]
        const decodedPayload = atob(payload)
        const parsedPayload = JSON.parse(decodedPayload)
        return parsedPayload.user
    } else {
        return null
    }
}


export const setToken = (token) => {
    if(typeof token !== 'string') {
      throw new Error("token must be type: 'string'")
    }
    localStorage.setItem('session_token', token)
    return token
  }

export const clearToken = () => {
    localStorage.removeItem('session_token')
    return true
  }
  