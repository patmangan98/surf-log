import { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import { DataBox } from '../../homePage/DataBox';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';

import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const JournalForm = (props) => {
//   const { id } = useParams();

  const {
    handleClose,
    data
  } = props 

 

 

  const handleSubmit = async () => {
    try {
      // await saveReview(reviewData)

      handleClose()
    
    } catch (error) {
      console.error(error)
    }
  }

//   return (
//     <Fragment>
//       <Grid container direction="row" justifyContent="center">
//         <Card
//           className="form-container"
//           width={1225}
//           sx={{
//             boxShadow: "3px 2px 7px rgb(0, 0, 0, 0.5)",
//           }}
//         >
//           <CardContent sx={{ display: "grid", margin: "50px", marginRight: "100px", width: "1200px"}}>
//             <Grid container direction="column" justify="center" >
//               <TextField
//                 label="Location"
//                 sx={{ marginBottom: "15px", marginTop: "10px" }}
//                 fullWidth
//                 onChange={(name) => setName(name.target.value)}
//                 value={name}
//                 helperText="Please enter your name or nickname."
//               />

//               <TextField
//                 id="summary"
//                 label="Surf Journal Record"
//                 sx={{ marginBottom: "5px" }}
//                 required
//                 fullWidth
//                 onChange={(summary) => setSummary(summary.target.value)}
//                 value={summary}
//                 helperText="Please provide a short summary."
//               />

//               <TextField
//                 id="review"
//                 label="Review"
//                 multiline
//                 required
//                 fullWidth
//                 rows={5}
//                 onChange={(review) => setReview(review.target.value)}
//                 value={review}
//                 helperText="How was your session?"
//               />

//               <br></br>
//               <Rating
//                 name="rating"
//                 value={rating}
//                 label=""
//                 required
//                 onChange={(event, rating) => {
//                   setRating(rating);
//                 }}
//               />
//             </Grid>
//           </CardContent>
//         </Card>
//       </Grid>

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
//     </Fragment>
//   );
// };


 

  return (
    <Fragment>
    <Typography>This is the journal form entry </Typography>

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
          
  )}




export default JournalForm;
