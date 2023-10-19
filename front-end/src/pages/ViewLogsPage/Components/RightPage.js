import { Grid, Card, Typography } from "@mui/material"
import CardContent from '@mui/material/CardContent';


export default function RightPage() {
    return (
        <>
            <Grid item xs={6}>
                <Card style={{ height: '80%', maxHeight: '80vh' }}>
                    <CardContent>
                        Right Content
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}