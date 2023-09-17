import { useState, useEffect } from "react"
import { clearToken } from "../../utility"
import { deletePost } from "../../api"
import { getToken } from "../../utility"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import BuoySelect from "./BuoySelect"
import { JournalForm } from "../components/JournalForm/JournalForm"
import { DataBox } from "./DataBox"
import { getMonthString } from "../../utility"
import { getLatestBuoyReading } from "../../utility"
import { useMyContext } from "../components/context/MyContext"

export default function HomePage({ setUser }) {
  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [selectedBuoy, setSelectedBuoy] = useState("data/realtime2/41008.txt")
  const token = getToken()

  const handleSelectChange = (value) => {
    setSelectedBuoy(value)
  }
  const { myState } = useMyContext()

  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const day = currentDate.getDate()

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

    fetch(selectedBuoy)
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
      <p>Hello from SurfLog</p>
      <p>
        The last buoy reading was at: {currentReading.MM}-{currentReading.DD}-
        {currentReading.YY}:{currentReading.hh}:{currentReading.mm} GMT time.
      </p>
      <button onClick={handleDelete}>Delete A Post</button>
      <button onClick={handleLogOut}>Log-Out</button>
      <br></br>
      <br></br>
     
      <br></br> <br></br>
      <br></br>
      <div style={{ height: "900px", overflowY: "auto" }}>
        <Grid container spacing={2}>
          {/* Left Side of Page*/}

          <Grid item xs={12} sm={6} md={3} lg={4} marginLeft={10}>
            <Card>
              <CardContent>
                {/* Get the selected buoy from the buoy select component */}
                <br></br>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Choose a Location/Buoy
                  </InputLabel>
                  <BuoySelect
                    onChange={handleSelectChange}
                    value={selectedBuoy}
                  ></BuoySelect>
                </FormControl>
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
            <Card style={{ height: "100%" }}>
              <CardContent style={{ height: "100%" }}>
                <Typography variant="h5" component="div">
                  Journal Entry
                </Typography>

                <Typography variant="h5" component="div">
                  {day} {getMonthString(month)} {year}
                </Typography>
                <JournalForm
                  currentReading={currentReading}
                  selectedBuoy={selectedBuoy}
                  currentDate={currentDate}
                  userId={myState}
                ></JournalForm>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
