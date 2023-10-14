import { Grid, Card, Typography } from "@mui/material"
import StickyNotes from "./StickyNotes"

export default function JournalPages() {
    return (
        <>
            <Grid container>
                <Card>
                    <Typography>This is the left card</Typography>
                    <StickyNotes></StickyNotes>
                </Card>

                <Card>
                    <Typography>This is the right card</Typography>
                </Card>


            </Grid>
        </>
    )
}