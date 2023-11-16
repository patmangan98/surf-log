import * as React from "react"
import { useState, useEffect } from "react"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import BuoySelect from "./BuoySelect"
import { WaveData } from "./WaveData"
import { WeatherData } from "./WeatherData"
import { getLatestBuoyReading } from "../../utility"
import { getWeatherData } from "../../utility"
import { getWaveData } from "../../api"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import Dayjs from "dayjs"
import Journal from "./journal/Journal"
import { getCurrentDate } from "../../utility"
import { celsiusToFahrenheit } from "../../utility"
import { weatherSearchUrl } from "../../utility"
import { getCompassDirection } from "../../utility"
// import "../../homepage.css"
import leftSvg from './images/Left.svg'
import middleSvg from './images/Middle.svg'
import rightSvg from './images/Right.svg'
// import logo from './logo.png'

export default function HomePage({ setUser, value }) {
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

  const handleSelectChange = (value) => {
    setCurrentReading(getWaveData(selectedDate.format("YYYY-MM-DD"), value))
    setSelectedBuoy(value)
  }

  const handleDateChange = (value) => {
    if (value !== "undefined") {
      getWaveData(value.format("YYYY-MM-DD"), selectedBuoy).then((result) => {
        //If it is today, we need to grab the latest reading and parse it with getLatestBuoyReading
        if (value.format("MM-DD-YYYY") === getCurrentDate()) {
          let tempCurrentReading = getLatestBuoyReading(result)

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

        getWeatherData(value.format("YYYY-MM-DD")).then((result) => {
          setWeatherData(result)
        })
      })
    }
    setSelectedDate(value)
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
    fetch(weatherSearchUrl(selectedDate.format("YYYY-MM-DD")))
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching message:", error)
      })
      .then((data) => {
        if (data !== undefined) {
          setWeatherData({
            currentTemp: celsiusToFahrenheit(
              parseFloat(data.days[0].temp),
              2
            ).toFixed(2),
            relativeHumidity: data.days[0].humidity,
            windSpeed: data.days[0].windspeed,
            windDirectionDegrees: data.days[0].winddir,
            windDirection: getCompassDirection(data.days[0].winddir),
            maxTemp: celsiusToFahrenheit(
              parseFloat(data.days[0].tempmax),
              2
            ).toFixed(2),
            minTemp: celsiusToFahrenheit(
              parseFloat(data.days[0].tempmin),
              2
            ).toFixed(2),
            sunriseTime: data.days[0].sunrise,
            sunsetTime: data.days[0].sunset,
            uvIndex: data.days[0].uvindex,
          })
        }
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

  // function handleLogOut() {
  //   clearToken()
  //   setUser()
  // }

console.log(weatherData)

  return (

    <Grid container spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh'
      }}
    >
      <Grid item xs={12} xl={3} order={{xs: 0, xl: 0}}>
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
      <Grid className="middle" item xs={12} xl={6} order={{xs: 2, xl: 1}}>
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
      <Grid className="right" item xs={12} xl={3} order={{xs: 1, xl: 2}}>
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
