import { Grid, Card, Typography, Button} from "@mui/material"
import CardContent from '@mui/material/CardContent';
import Pages from "./Pages";
import { useState, useEffect, useRef } from "react";
import { getUserId } from "../../utilities/users-service";
import { indexPosts } from "../../utilities/posts-api";
import Carousel from "framer-motion-carousel"
// import './carousel.css'

export default function JournalPages() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        indexPosts(getUserId())
            .then(res => res.json())
            .then(resData => setPosts(resData))
    }, [])
    const carouselRef = useRef(0)

    let postMap = posts.map((post, index) => (
        <>
     
                <Pages
                    post={post}
                    key={`${index} + ${post['post_id']}`}
                />
     
        </>
    ))



    return (
        <>
        <div className="carosuel" style={{
            height: 800,
            width:'80vw',
            margin: '0 auto',
            marginTop: '15vh',
            paddingRight: '20px',
            paddingLeft: '20px'
        }}>
     
        <Carousel
            autoPlay={false}
            // renderArrowLeft={() => null}
            // renderArrowRight={() => null}
            // renderDots={() => null}
        >
     
        {postMap}
      
        </Carousel>
      
        </div>
        </>
        
    )
}




