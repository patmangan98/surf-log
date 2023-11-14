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
// import "../../homepage.css"
import leftSvg from './images/Left.svg'
import middleSvg from './images/Middle.svg'
import rightSvg from './images/Right.svg'
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

    <Grid container spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh'
      }}
    >
      <Grid item xs={3}>
        <Card
          sx={{
            height: '70vh',
            background: `linear-gradient(to bottom,  
                rgba(1, 36, 58, 1) 0%, 
                rgba(1, 36, 58, .8) 25%, 
                rgba(1, 36, 58, 0) 50%, 
                rgba(1, 36, 58, 0) 75%, 
                rgba(1, 36, 58, 1) 100%,
                transparent),
                 url(${leftSvg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        >
          <Card sx={{ 
              backgroundColor: 'transparent',
              border : 'none',
              boxShadow: 0 
            }}   >
            <CardContent>
              <WaveData currentReading={currentReading} />
            </CardContent>
          </Card>
        </Card>
      </Grid>
      <Grid className="middle" item xs={6}>
        <Card
          sx={{
            height: '70vh',
            background: `linear-gradient(to bottom,  
                rgba(1, 36, 58, 1) 0%, 
                rgba(1, 36, 58, .8) 25%, 
                rgba(1, 36, 58, 0) 50%, 
                rgba(1, 36, 58, 0) 75%, 
                rgba(1, 36, 58, 1) 100%,
                transparent), url(${middleSvg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
          elevation={3}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "100%"
            }}
          >
            <Grid item>

              <BuoySelect onChange={handleSelectChange}></BuoySelect>

              <Card sx={{
                marginBottom: '2vh',
                paddingX: '1vh',
                paddingY: '1vw'
              }}>
                <Typography style={{ fontSize: "20px" }}>
                  {messageText}
                </Typography>

              </Card>
              <Card>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="dd-mm-yy"
                    disableFuture
                  />
                </LocalizationProvider>
              </Card>

              <Journal
                currentReading={currentReading}
                selectedBuoy={selectedBuoy}
                date={selectedDate}
              ></Journal>

            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid className="right" item xs={3}>
        <Card
          sx={{
            height: '70vh',
            backgroundImage: ` linear-gradient(to bottom,  
                rgba(1, 36, 58, 1) 0%, 
                rgba(1, 36, 58, .8) 25%, 
                rgba(1, 36, 58, 0) 50%, 
                rgba(1, 36, 58, 0) 75%, 
                rgba(1, 36, 58, 1) 100%,
                transparent), url(${rightSvg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        >

      
          <Card sx={{ 
            backgroundColor: 'transparent',
            border : 'none',
            boxShadow: 0, 
            height: '100%',
            }}>
          <CardContent sx={{
            backgroundColor: 'transparent',
            border : 'none',
            boxShadow: 0 
          }}> 
          <WeatherData weatherData={weatherData} />
          </CardContent>
          </Card>
         
         
        </Card>
      </Grid>

    </Grid>





  )
}
