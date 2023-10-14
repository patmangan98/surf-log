import { getToken } from "./users-service"
const baseUrl = 'http://localhost:8000'


export const indexPosts = (userId) => {
 const token = getToken()
 return fetch(`${baseUrl}/posts/${userId}`, {
    method : "GET",
    headers: {
        Authorization: `Bearer ${token}`,
    },

} )
}
