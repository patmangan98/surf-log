import { Fragment, useState } from "react"
import { addNewPost } from "../../../api"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Rating from "@mui/material/Rating"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

export const JournalForm = ({
  currentReading,
  selectedBuoy,
  currentDate,
  userId,
  }) => {

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
  }

  const handleSubmit = () => {
    post.user_id = userId
    post.post_date = currentDate
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

    addNewPost(post)
  }
  return (
    <Fragment>
      <Grid container direction="row" justifyContent="center">
        <Card
          className="form-container"
          width={1225}
          sx={{
            boxShadow: "3px 2px 7px rgb(0, 0, 0, 0.5)",
          }}
        >
          <CardContent
            sx={{
              display: "grid",
              margin: "50px",
              marginRight: "100px",
              width: "1200px",
            }}
          >
            <Grid container direction="column" justify="center">
              <TextField
                sx={{ marginBottom: "15px", marginTop: "10px" }}
                fullWidth
                onChange={(location) => setLocation(location.target.value)}
                value={location}
                helperText="Where did you surf?"
              />

              <TextField
                id="review"
                multiline
                required
                fullWidth
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
                required
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
          // onClick={handleClose}
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
