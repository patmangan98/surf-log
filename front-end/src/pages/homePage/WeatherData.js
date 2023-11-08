import Grid from "@mui/material/Grid"
import { DataBox } from "./DataBox"

export const WeatherData = ({ weatherData }) => {
  
  return (
    <Grid container
    direction="column" 
    justifyContent="center"
    alignItems="center"
    spacing={4} 
  >
    <Grid item>
      <DataBox
        title="Temperature"
        data={weatherData.currentTemp}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item>
      <DataBox
        title="Today's High Temp"
        data={weatherData.maxTemp}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item>
      <DataBox
        title="Today's Low Temp"
        data={weatherData.minTemp}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item>
      <DataBox
        title="Relative Humidity"
        data={weatherData.relativeHumidity}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item>
      <DataBox
        title="Windspeed"
        data={weatherData.windSpeed}
        label="mph"
      ></DataBox>
    </Grid>

    <Grid item>
      <DataBox
        title="Wind Direction"
        data={weatherData.windDirection}
        label={weatherData.windDirectionDegrees + " degrees"}
      ></DataBox>
    </Grid>

    <Grid item>
      <DataBox
        title="Sunrise Time"
        data={weatherData.sunriseTime}
        label="AM"
      ></DataBox>
    </Grid>

    <Grid item>
      <DataBox
        title="Sunset Time"
        data={weatherData.sunsetTime}
        label="PM"
      ></DataBox>
    </Grid>
  </Grid>
  )
  }