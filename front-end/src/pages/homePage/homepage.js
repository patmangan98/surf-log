import { useState, useEffect } from "react"
import { clearToken } from "../../utility"
import { addNewPost } from "../../api"
import { deletePost } from "../../api"
import { updatePost } from "../../api"
import { getToken } from "../../utility"
import Journal from "../components/JournalForm/Journal"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import BuoySelect from "./BuoySelect"
import { DataBox } from "./DataBox"
import { metersToFeet } from "../../utility"

export default function HomePage({ setUser }) {
  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [selectedBuoy, setSelectedBuoy] = useState("")

  const handleSelectChange = (value) => {
    setSelectedBuoy(value)
  }

  const currentDate = new Date()
  const dateTimeString = currentDate.toString()

  const inputStyles = {
    // Customize the height and other styles as needed
    height: "300px", // Adjust the height to make it larger
    fontSize: "16px", // Adjust the font size as needed
  }
  const [currentReading, setCurrentReading] = useState({
    YY: "",
    MM: "",
    DD: "",
    hh: "",
    mm: "",
    WDIR: "",
    WSPD: "",
    GST: "",
    WVHT: "",
    DPD: "",
    APD: "",
    MWD: "",
    PRES: "",
  })

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching message:", error)
      })

    // const fileUrl = "data/realtime2/41008.txt"
    console.log(selectedBuoy)
    if (!selectedBuoy) {
      setSelectedBuoy("data/realtime2/41008.txt")
    }
    fetch(selectedBuoy)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.text()
      })
      .then((fileContent) => {
        const dataString = fileContent.split("\n")

        //Get the latest reading from the buoy
        let dataSplit = dataString[2].split(/\s+/)
        console.log("first data split", dataSplit)
        //If the latest reading does not have wave height or wave period, loop through the data string until we find one that does

        if (dataSplit[8] == "MM" || dataSplit[9] == "MM") {
          for (let i = 3; i < dataString.length; i++) {
            //Set the array to the next buoy reading
            dataSplit = dataString[i].split(/\s+/)
            console.log("new data split", dataSplit)
            //If that buoy reading has wave height and wave period, exit the loop
            if (dataSplit[8] !== "MM" && dataSplit[9] !== "MM") {
              break
            }
          }
        }
        dataSplit[8] = metersToFeet(parseFloat(dataSplit[8]))

        const [YY, MM, DD, hh, mm, WDIR, WSPD, GST, WVHT, DPD, APD, MWD, PRES] =
          dataSplit

        setCurrentReading({
          YY,
          MM,
          DD,
          hh,
          mm,
          WDIR,
          WSPD,
          GST,
          WVHT,
          DPD,
          APD,
          MWD,
          PRES,
        })
      })
      .catch((error) => {
        console.error("Error reading the file:", error)
      })
  }, [selectedBuoy])

  function handleLogOut() {
    clearToken()
    setUser()
  }

  //Dummy post data
  const post = {
    user_id: "1",
    post_date: "2023-09-03",
    post_description: "New New Post",
    post_location: "Rincon Californina",
    WDIR: "270",
    WSPD: "5.2",
    GST: "5.6",
    WVHT: "2.2",
    DPD: "6.3",
    APD: "5.2",
    MWD: "155",
    PRES: "29.24",
  }
  const token = getToken()
  const handleNewPost = () => {
    addNewPost(post)
  }

  const handleDelete = () => {
    const post_id = 4
    deletePost(post_id)
  }

  const handleUpdate = () => {
    updatePost(post)
  }

  return (
    <>
      <p>Hello from SurfLog</p>
      <p>
        The last buoy reading was at: {currentReading.MM}-{currentReading.DD}-
        {currentReading.YY}:{currentReading.hh}:{currentReading.mm} GMT time.
      </p>
      <button onClick={handleNewPost}>Add New Post</button>
      <button onClick={handleDelete}>Delete A Post</button>
      <button onClick={handleUpdate}>Update A Post</button>
      <button onClick={handleLogOut}>Log-Out</button>
      <br></br>
      <br></br>
      <Journal></Journal>
      <br></br> <br></br>
      <br></br>
      {/* Get the selected buoy from the buoy select component */}
      <FormControl>
        <InputLabel id="demo-simple-select-label">
          Choose a Location/Buoy
        </InputLabel>
        <BuoySelect onChange={handleSelectChange}></BuoySelect>
      </FormControl>
      <Grid container spacing={2}>
        {/* Left Side of Page*/}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid
                direction="row"
                justifyContent="space-evenly"
                alignItems="stretch"
              >
                <DataBox
                  title="Current Wave Height"
                  data={currentReading.WVHT}
                  label="feet"
                ></DataBox>
                <DataBox
                  title="Dominant Wave Period"
                  data={currentReading.DPD}
                  label="seconds"
                ></DataBox>
                <DataBox
                  title="Average Wave Period"
                  data={currentReading.APD}
                  label="seconds"
                ></DataBox>
                <DataBox
                  title="Mean Wave Direction"
                  data={currentReading.MWD}
                  label="degrees"
                ></DataBox>
                <DataBox
                  title="Atmospheric Pressure"
                  data={currentReading.PRES}
                  label="atms"
                ></DataBox>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side of Page */}
        <Grid item xs={12} md={6}>
          <Card style={{ height: "100%" }}>
            <CardContent style={{ height: "100%" }}>
              <Typography variant="h5" component="div">
                Journal Entry
              </Typography>

              <Typography variant="h5" component="div">
                {dateTimeString}
              </Typography>

              <TextField
                label="Large Text Input"
                variant="outlined"
                multiline
                rows={4} // Number of visible rows
                fullWidth
                InputProps={{
                  style: inputStyles, // Apply the custom styles
                }}
              />
              <Button
                className="button"
                variant="contained"
                sx={{ marginTop: "10px", width: "225px" }}
                target="_blank"
              >
                Record a Journal Entry
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
