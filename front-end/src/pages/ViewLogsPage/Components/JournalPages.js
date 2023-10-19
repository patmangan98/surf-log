import { Grid, Card, Typography } from "@mui/material"
import CardContent from '@mui/material/CardContent';
import StickyNotes from "./StickyNotes"
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import { useState, useEffect } from "react";
import { getUserId } from "../../utilities/users-service";
import { indexPosts } from "../../utilities/posts-api";



export default function JournalPages() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        indexPosts(getUserId())
            .then(res => res.json())
            .then(resData => setPosts(resData))
    }, [])


    let postMap = posts.map((post, index) => (
        <>
        <LeftPage
            post={post}
            key={`${index} + ${post['post_id']}`}
        />
        <RightPage 
            post = {post}
            key={`${index} + ${post['user_id']}`}
        />
        </>
    ))



    return (
        <>
            <Grid
                container
                justifyContent="center" alignItems="center"
                spacing={2}
                style={{
                    height: '100vh'
                }}>

                {postMap}

            </Grid>
        </>
    )
}

//    APD : post.APD,
//    DPD : post.DPD,
//    GST : post.MWD,
//    PRES : post.PRES,
//    WDIR : post.WDIR,
//    WSPD : post.WSPD 


