import { Grid, Card, Typography } from "@mui/material"
import CardContent from '@mui/material/CardContent';
import StickyNotes from "./StickyNotes";
import { v4 as uuidv4 } from 'uuid'

export default function LeftPage({ post }) {


let postObj = post
let postMatrix = []
Object.entries(postObj).forEach(([key, value]) => {
    let sticky = [key, value]
    postMatrix.push(sticky)
})
//  console.log(post)

let stickyMap

let postMatrixMap = postMatrix.map((row, rowIndex) => {

       
       
       
     
        <StickyNotes 
            title = {row[0]}
            value = {row[1]}
            key = {uuidv4()}
        
        />
        
})

    return (
        <>
            <Grid item xs={6}>
                <Card style={{ height: '80%', maxHeight: '80vh' }}>
                    
                    <CardContent>
                    {postMatrixMap}
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}