import { Grid, Card, Typography, Divider, Button } from "@mui/material"
import CardContent from "@mui/material/CardContent"
import { getWeatherLocation } from '../../../utility'
import StickyNotes from "./StickyNotes"
import { v4 as uuidv4 } from "uuid"


export default function Pages({ post }) {
    //Format the timestamp into a readable date
    const inputDate = new Date(post.post_date);

    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    
    return (
    <>
      {/* <Grid item xs={12}> */}
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        spacing={4}
        style={{
          minHeight: 680,
        }}
      >
        <Grid
          item
          xs={5}
          style={{
            minHeight: 680,
          }}
        >
          <Card
            elevation={3}
            sx={{
              minHeight: "90%",
              background: `linear-gradient(to bottom, 
                                    rgba( 1, 36, 58 ) 0%,
                                    rgba(16, 112, 166) 100%)`,
            }}
          >
            <CardContent>
              <Typography variant="h4" color="white">
                Wave Data
              </Typography>
            </CardContent>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">Wave Height</Typography>
                    <Typography variant="h5">{post.WVHT}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">
                      Dominant Wave Period
                    </Typography>
                    <Typography variant="h5">{post.DPD}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">
                      Average Wave Period
                    </Typography>
                    <Typography variant="h5">{post.APD}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">Wave Direction</Typography>
                    <Typography variant="h5">{post.MWD}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">Wind Direction</Typography>
                    <Typography variant="h5">{post.WDIR}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">Wind Speed</Typography>
                    <Typography variant="h5">{post.WSPD}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">Peak Gust Speed</Typography>
                    <Typography variant="h5">{post.GST}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">
                      Atmospheric Pressure
                    </Typography>
                    <Typography variant="h5">{post.PRES}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card
            elevation={3}
            sx={{
              minHeight: "90%",
              background: `linear-gradient(to bottom, 
                                    rgba( 1, 36, 58 ) 0%,
                                    rgba(16, 112, 166) 100%)`,
            }}
          >
            <CardContent>
              <Typography variant="overline" color="white">
                {" "}
                Location:
              </Typography>
              <Typography variant="h4" color="white">
                {post.post_location}
              </Typography>
              <Divider color="white" />
              <Typography variant="h5" color="white">
                {formattedDate}
              </Typography>
              <br></br>
              <Typography variant="body1" color="white">
                {post.post_description}
              </Typography>
              <Button>Edit Post</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </>
  )
}
