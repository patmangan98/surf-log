import { useState } from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { Fragment } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Rating from "@mui/material/Rating"
import { addNewPost } from "../../../api"
import { useMyContext } from "../../components/context/MyContext"
import { getUserId } from "../../utilities/users-service"
import Typography from "@mui/material/Typography"

const JournalForm = ({ currentReading, selectedBuoy, date, handleClose }) => {
  const [location, setLocation] = useState()
  const [description, setDescription] = useState()
  const [rating, setRating] = useState()

  let post = {
    user_id: "",
    post_date: "",
    post_description: "",
    post_location: "",
    WDIR: "",
    WSPD: "",
    GST: "",
    WVHT: "",
    DPD: "",
    APD: "",
    MWD: "",
    PRES: "",
    buoy_id: ""
  }

  const handleSubmit = async () => {
    post.user_id = getUserId()
    post.post_date = date.format('MM-DD-YYYY')
    post.post_description = description
    post.post_location = location
    post.WDIR = currentReading.WDIR
    post.WSPD = currentReading.WSPD
    post.GST = currentReading.GST
    post.WVHT = currentReading.WVHT
    post.DPD = currentReading.DPD
    post.APD = currentReading.APD
    post.MWD = currentReading.MWD
    post.PRES = currentReading.PRES
    post.buoy_id = selectedBuoy
    try {
      addNewPost(post)
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Fragment>
      <Grid container direction="row" justifyContent="center">
        <Card
          className="form-container"
          width={1200}
          sx={{
            borderRadius: "8px",
            boxShadow: "3px 2px 7px rgb(0, 0, 0, 0.5)",
          }}
        >
          <CardContent sx={{ display: "grid", margin: "75px" }}>
            <Grid container direction="column" justify="center" width={400}>
              <Typography style={{ fontSize: '24px' }}>Surf Journal Record for {date.format('MM-DD-YYYY')} </Typography>
              <br></br>
              <TextField
                sx={{ marginBottom: "5px" }}
                onChange={(location) => setLocation(location.target.value)}
                value={location}
                helperText="Where did you surf?"
              />

              <TextField
                id="review"
                label="Write a review"
                multiline
                rows={5}
                onChange={(description) =>
                  setDescription(description.target.value)
                }
                value={description}
                helperText="How was your session?"
              />

              <br></br>
              <Rating
                name="rating"
                value={rating}
                label=""
                onChange={(event, rating) => {
                  setRating(rating)
                }}
              />
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid container direction="row" justify-content="center">
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ margin: "15px", width: "150px" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ margin: "15px", width: "150px" }}
        >
          Submit
        </Button>
      </Grid>
    </Fragment>
  )
}

export default JournalForm
