import Grid from "@mui/material/Grid"
import { DataBox } from "./DataBox"
import { Typography } from "@mui/material"

export const WeatherData = ({ weatherData }) => {
  
  return (
    <Grid container
    direction="row" 
    justifyContent="center"
    alignItems="center"
    spacing={2} 
  >
     <Grid item xs={10}></Grid>
       <Grid item xs={10}>
        <Typography color='white' variant="h4" fontWeight={500}>Current Weather Data</Typography>
      </Grid>
      {/* <Grid item xs={0} xl={10}></Grid>
      <Grid item xs={0} xl={10}></Grid>
      <Grid item xs={0} xl={10}></Grid>
      <Grid item xs={0} xl={10}></Grid>
      <Grid item xs={0} xl={10}></Grid> */}
    <Grid item xs={5}>
      <DataBox
        title="Temperature"
        data={weatherData.currentTemp}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item xs={5}>
      <DataBox
        title="Today's High Temp"
        data={weatherData.maxTemp}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item xs={5}>
      <DataBox
        title="Today's Low Temp"
        data={weatherData.minTemp}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item xs={5}> 
      <DataBox
        title="Relative Humidity"
        data={weatherData.relativeHumidity}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item xs={5}>
      <DataBox
        title="Windspeed"
        data={weatherData.windSpeed}
        label="mph"
      ></DataBox>
    </Grid>

    <Grid item xs={5}>
      <DataBox
        title="Wind Direction"
        data={weatherData.windDirection}
        label={weatherData.windDirectionDegrees + " degrees"}
      ></DataBox>
    </Grid>

    <Grid item xs={10}>
      <DataBox
        title="Sunrise Time"
        data={weatherData.sunriseTime}
        label="AM"
      ></DataBox>
    </Grid>

    <Grid item xs={10}>
      <DataBox
        title="Sunset Time"
        data={weatherData.sunsetTime}
        label="PM"
      ></DataBox>
    </Grid>
  </Grid>
  )
  }