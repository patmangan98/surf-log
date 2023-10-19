import { Grid, Card, Typography } from "@mui/material"
import CardContent from '@mui/material/CardContent';
import StickyNotes from "./StickyNotes";


export default function LeftPage({ post }) {

//  console.log(post)

    return (
        <>
            <Grid item xs={6}>
                <Card style={{ height: '80%', maxHeight: '80vh' }}>
                    <CardContent>
                        Left Content
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}