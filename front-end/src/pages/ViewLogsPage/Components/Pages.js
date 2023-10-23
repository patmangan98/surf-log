import { Grid, Card, Typography, Divider } from "@mui/material"
import CardContent from '@mui/material/CardContent';
import StickyNotes from "./StickyNotes";
import { v4 as uuidv4 } from 'uuid'

export default function Pages({ post }) {


    return (

        <>
            {/* <Grid item xs={12}> */}
                <Grid
                    container
                    spacing={2}
                    style={{
                        minHeight: 680
                    }}
                >
                    <Grid item xs={6}
                        style={{
                            minHeight: 680,
                
                        }}
                    >
                        <Card
                            elevation={3}
                            sx={{
                                minHeight: '90%'
                            }}
                        >
                            <CardContent>
                                <Typography variant="h4">Wave Data</Typography>
                            </CardContent>
                            <Grid
                                container
                                justifyContent='center'
                                spacing={2}
                
                            >
                                <Grid item xs={5}>
                                    <Card elevation={3}>
                                        <CardContent>
                                            <Typography variant="overline">
                                                Wave Height
                                            </Typography>
                                            <Typography variant="h4">
                                                {post.WVHT}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card elevation={3}>
                                        <CardContent>
                                            <Typography variant="overline">
                                                Dominant Wave Period
                                            </Typography>
                                            <Typography variant="h4">
                                                {post.DPD}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card elevation={3}>
                                        <CardContent>
                                            <Typography variant="overline">
                                                Average Wave Period
                                            </Typography>
                                            <Typography variant="h4">
                                                {post.APD}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card elevation={3}>
                                        <CardContent>
                                            <Typography variant="overline">
                                                Wave Direction
                                            </Typography>
                                            <Typography variant="h4">
                                                {post.MWD}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card elevation={3}>
                                        <CardContent>
                                            <Typography variant="overline">
                                                Wind Direction
                                            </Typography>
                                            <Typography variant="h4">
                                                {post.WDIR}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card elevation={3}>
                                        <CardContent>
                                            <Typography variant="overline">
                                                Wind Speed
                                            </Typography>
                                            <Typography variant="h4">
                                                {post.WSPD}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card elevation={3}>
                                        <CardContent>
                                            <Typography variant="overline">
                                                Peak Gust Speed
                                            </Typography>
                                            <Typography variant="h4">
                                                {post.GST}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card elevation={3}>
                                        <CardContent>
                                            <Typography variant="overline">
                                                Atmospheric Pressure
                                            </Typography>
                                            <Typography variant="h4">
                                                {post.PRES}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card
                        elevation={3}
                            sx={{
                                minHeight: '90%'
                            }}
                        >
                            <CardContent>
                            <Typography variant="overline"> Location:</Typography>
                            <Typography variant="h4">{post.post_location}</Typography>
                            <Divider/>
                            <br></br>
                            <Typography variant="body1">{post.post_description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            {/* </Grid> */}
        </>
    )
}