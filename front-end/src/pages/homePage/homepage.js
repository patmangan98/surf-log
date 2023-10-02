import * as React from "react"
import { useState, useEffect } from "react"
import { clearToken } from "../../utility"
import { deletePost } from "../../api"
import { getToken } from "../../utility"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import BuoySelect from "./BuoySelect"
import { DataBox } from "./DataBox"
import { getLatestBuoyReading } from "../../utility"
import { getWaveData } from "../../api"
import { useMyContext } from "../components/context/MyContext"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import Dayjs from "dayjs"
import Journal from "./journal/Journal"
import { getCurrentDate } from "../../utility"
import "../../homepage.css"

export default function HomePage({ setUser, value }) {
  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const token = getToken()
  const [selectedBuoy, setSelectedBuoy] = useState("41004")
  const [selectedDate, setSelectedDate] = useState(Dayjs())
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

  const handleSelectChange = (value) => {
    setCurrentReading(getWaveData(selectedDate.format("YYYY-MM-DD"), value))
    setSelectedBuoy(value)
  }

  const handleDateChange = (value) => {
    console.log(currentReading)  
    if (value !== "undefined") {
      getWaveData(value.format("YYYY-MM-DD"), selectedBuoy).then((result) => {
        //If it is today, we need to grab the latest reading and parse it with getLatestBuoyReading 
        if (value.format("MM-DD-YYYY") === getCurrentDate()) {
          let tempCurrentReading = getLatestBuoyReading(result)
              console.log(tempCurrentReading)
          setCurrentReading({
            ...currentReading,
            WVHT: tempCurrentReading[8],
            DPD: tempCurrentReading[9],
            APD: tempCurrentReading[10],
            MWD: tempCurrentReading[11],
            PRES: tempCurrentReading[12],
            WDIR: tempCurrentReading[5],
            WSPD: tempCurrentReading[6],
            GST: tempCurrentReading[7],
          })
        } else {
          //If the date is not today, read the results from the database, returned as an object, no parsing required
          setCurrentReading(result)
        }
      })
    }
    setSelectedDate(value)
  }
 
  //Buoy conditions message changes based on current date vs historical date
  let messageText = "Conditions for "
  if (selectedDate.format("MM-DD-YYYY") === getCurrentDate()) {
    messageText = "Current " + messageText + " today " + getCurrentDate()
  } else {
    messageText =
      "Historical " + messageText + selectedDate.format("MM-DD-YYYY")
  }

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching message:", error)
      })
    const fetchString = "data/realtime2/" + selectedBuoy + ".txt"

    fetch(fetchString)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.text()
      })
      .then((fileContent) => {
        const [YY, MM, DD, hh, mm, WDIR, WSPD, GST, WVHT, DPD, APD, MWD, PRES] =
          getLatestBuoyReading(fileContent)

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

  const handleDelete = () => {
    const post_id = 4
    deletePost(post_id)
  }

  // const handleUpdate = () => {
  //   updatePost(post)
  // }

  return (
    <>
      <div className="home">
        <br></br>
        <h1>Welcome to  SurfBoard!</h1>
        {/* <button onClick={handleDelete}>Delete A Post</button> */}
        {/* <button onClick={handleLogOut}>Log-Out</button> */}
        <br></br>
        <br></br>
        <br></br> <br></br>
        <br></br>
        <div style={{ height: "1000px", overflowY: "auto" }}>
          <Grid container spacing={2}>
            {/* Left Side of Page*/}

            <Grid item xs={12} sm={6} md={3} lg={4} marginLeft={12}>
              <Card sx={{ border: 2 }}>
                <CardContent style={{ height: "100%" }}>
                  {/* Get the selected buoy from the buoy select component */}
                  <br></br>

                  <BuoySelect onChange={handleSelectChange}></BuoySelect>
                  <Typography style={{ fontSize: '20px' }}>{messageText}</Typography>
                  <br></br>
                  <Grid direction="row" spacing={3} container>
                    <Grid item>
                      <DataBox
                        title="Current Wave Height"
                        data={currentReading.WVHT}
                        label="feet"
                      ></DataBox>
                    </Grid>
                    <Grid item>
                      <DataBox
                        title="Dominant Wave Period"
                        data={currentReading.DPD}
                        label="seconds"
                      ></DataBox>
                    </Grid>
                    <Grid item>
                      <DataBox
                        title="Average Wave Period"
                        data={currentReading.APD}
                        label="seconds"
                      ></DataBox>
                    </Grid>
                    <Grid item>
                      <DataBox
                        title="Mean Wave Direction"
                        data={currentReading.MWD}
                        label="degrees"
                      ></DataBox>
                    </Grid>
                    <Grid item>
                      <DataBox
                        title="Atmospheric Pressure"
                        data={currentReading.PRES}
                        label="atms"
                      ></DataBox>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Side of Page */}
            <Grid item xs={12} sm={6} md={4} lg={6} marginLeft={10}>
              <Card sx={{ border: 2 }}>
                <CardContent style={{ height: "100%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={selectedDate}
                      onChange={handleDateChange}
                      format="dd-mm-yy"
                      disableFuture
                    />
                  </LocalizationProvider>
                  <Journal
                    currentReading={currentReading}
                    selectedBuoy={selectedBuoy}
                    date={selectedDate}
                  ></Journal>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}
