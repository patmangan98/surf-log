import Grid from "@mui/material/Grid"
import { DataBox } from "./DataBox"

export const WaveData = ({ currentReading }) => {

  return (
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
  )
}
