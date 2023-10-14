import { getUserId } from "../utilities/users-service"
import { useEffect, useState } from "react"
import { indexPosts } from "../utilities/posts-api"


export default function ViewLogsPage () {

const [posts, setPosts] = useState([])

useEffect(() => {
    indexPosts(getUserId())
        .then(res => res.json())
        .then(resData => setPosts(resData))
}, [])

console.log(posts)


for(let i = 0; i < posts.length; i++) {
    console.log(posts[`${i}`])
}


    return (
        <>
        <h1>View Logs Page!</h1>
        </>
    )
}