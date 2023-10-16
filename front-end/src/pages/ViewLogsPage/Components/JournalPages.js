import { Grid, Card, Typography } from "@mui/material"
import StickyNotes from "./StickyNotes"

export default function JournalPages() {
    return (
        <>
            <Grid
                container
                spacing={2}
                justifyContent={'center'}
                alignContent={'center'}
                sx={{
                    maxWidth: '100vw',
                    height: '80vh'
                }} >
                <Grid item 
                xs={5}
                sx ={{maxHeight: '50vh'}}
                >
                    <Card>
                        <Typography>This is the left card</Typography>
                        <StickyNotes></StickyNotes>
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card>
                        <Typography>This is the right card</Typography>
                    </Card>
                </Grid>

            </Grid>
        </>
    )
}