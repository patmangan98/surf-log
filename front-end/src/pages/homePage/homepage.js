import * as React from "react"
import { useState, useEffect } from "react"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import BuoySelect from "./BuoySelect"
import { WaveData } from "./WaveData"
import { WeatherData } from "./WeatherData"
import { getLatestBuoyReading, getHistoricalBuoyReading, getWeatherData, getCurrentDate  } from "../../utility"
import { getWaveData } from "../../api"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import Dayjs from "dayjs"
import Journal from "./journal/Journal"

import { isGreaterThan45Days } from "../../utility"
import "../../homepage.css"

export default function HomePage() {
  const [selectedBuoy, setSelectedBuoy] = useState("41004")
  const [selectedDate, setSelectedDate] = useState(Dayjs())
  const [waveData, setWaveData] = useState({
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

  const [weatherData, setWeatherData] = useState({
    currentTemp: "",
    relativeHumidity: "",
    windSpeed: "",
    windDirection: "",
    minTemp: "",
    maxTemp: "",
    sunriseTime: "",
    sunsetTime: "",
    uvIndex: "",
  })

  const handleSelectChange = (newBuoy) => {
    setWaveData(getWaveData(selectedDate.format("YYYY-MM-DD"), newBuoy))
    setSelectedBuoy(newBuoy)
  }

  const handleDateChange = (newDate) => {
    if (newDate !== "undefined") {
      getWaveData(newDate.format("YYYY-MM-DD"), selectedBuoy).then((result) => {
        let tempWaveData

        if (newDate.format("MM-DD-YYYY") === getCurrentDate()) {
          tempWaveData = getLatestBuoyReading(result)
        } else if (
          isGreaterThan45Days(newDate.format("MM-DD-YYYY"), getCurrentDate())
        ) {
          tempWaveData = getHistoricalBuoyReading(
            result,
            newDate.format("YYYY-MM-DD")
          )
        } else {
          setWaveData(result)
        }

        console.log(tempWaveData)
        if (tempWaveData) {
          setWaveData({
            ...waveData,
            WVHT: tempWaveData[8],
            DPD: tempWaveData[9],
            APD: tempWaveData[10],
            MWD: tempWaveData[11],
            PRES: tempWaveData[12],
            WDIR: tempWaveData[5],
            WSPD: tempWaveData[6],
            GST: tempWaveData[7],
          })
        }

        getWeatherData(newDate.format("YYYY-MM-DD")).then((result) => {
          setWeatherData(result)
        })
      })

      setSelectedDate(newDate)
    }
  }

  //Message changes based on current date vs historical date
  let messageText = "Conditions for "
  if (selectedDate.format("MM-DD-YYYY") === getCurrentDate()) {
    messageText = "Current " + messageText + " today " + getCurrentDate()
  } else {
    messageText =
      "Historical " + messageText + selectedDate.format("MM-DD-YYYY")
  }

  useEffect(() => {
    getWeatherData(selectedDate.format("YYYY-MM-DD")).then((result) => {
      setWeatherData(result)
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

        setWaveData({
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

  return (
    <>
      <div className="home">
        <div className="center-container">
          <h1> Welcome to Surfboard!</h1>
        </div>

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
                  <Typography style={{ fontSize: "20px" }}>
                    {messageText}
                  </Typography>
                </CardContent>
              </Card>
              <br></br>
              <Card
                sx={{
                  backgroundColor: "transparent",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <CardContent style={{ height: "100%" }}>
                  <WaveData waveData={waveData} />
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
                    waveData={waveData}
                    selectedBuoy={selectedBuoy}
                    date={selectedDate}
                  ></Journal>
                </CardContent>
              </Card>
              <br></br>
              <Card sx={{ border: 2 }}>
                <CardContent style={{ height: "100%" }}>
                  <br></br>
                  <Typography style={{ fontSize: "24px" }}>
                    {messageText}
                  </Typography>
                </CardContent>
              </Card>
              <br></br>
              <Card
                sx={{
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardContent style={{ height: "100%" }}>
                  <WeatherData weatherData={weatherData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}
