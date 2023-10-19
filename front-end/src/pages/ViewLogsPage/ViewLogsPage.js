
import { getUserId } from "../utilities/users-service"
import { useEffect, useState } from "react"
import { indexPosts } from "../utilities/posts-api"
import JournalPages from "./Components/JournalPages"


export default function ViewLogsPage () {

// const [posts, setPosts] = useState([])

// useEffect(() => {
//     indexPosts(getUserId())
//         .then(res => res.json())
//         .then(resData => setPosts(resData))
// }, [])

// // console.log(posts)


// for(let i = 0; i < posts.length; i++) {
//     console.log(posts[`${i}`])
// }

// to do: make a sticky note component that can be easily mapped over 

// put that in the left div, and the actual text into the right div 

// wrap those divs in the carousel 

//style properly 
return (
    <>
    <JournalPages />
    
    </>
)



}


