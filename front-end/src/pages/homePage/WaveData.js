import Grid from "@mui/material/Grid"
import { DataBox } from "./DataBox"
import { Typography } from "@mui/material"
import '@fontsource/roboto/500.css';

export const WaveData = ({ currentReading }) => {

  return (
    <Grid 
    direction="row" 
    justifyContent="center"
    alignItems="flex-start"
    spacing={2} 
    container>
       <Grid item xs={10}></Grid>
      <Grid item xs={10}>
        <Typography color='white' variant="h4" fontWeight={500}>Current Wave Data</Typography>
      </Grid>
      <Grid item xs={10}></Grid>
      <Grid item xs={10}></Grid>
      <Grid item xs={10}></Grid>
      <Grid item xs={10}></Grid>
      <Grid item xs={10}></Grid>
      <Grid item xs={10}>
        <DataBox
          title="Current Wave Height"
          data={currentReading.WVHT}
          label="feet"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Dominant Wave Period"
          data={currentReading.DPD}
          label="seconds"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Average Wave Period"
          data={currentReading.APD}
          label="seconds"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Mean Wave Direction"
          data={currentReading.MWD}
          label="degrees"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Atmospheric Pressure"
          data={currentReading.PRES}
          label="atms"
        ></DataBox>
      </Grid>
    </Grid>
  )
}
