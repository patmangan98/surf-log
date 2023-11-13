import Grid from "@mui/material/Grid"
import { DataBox } from "./DataBox"

export const WaveData = ({ waveData }) => {

  return (
    <Grid direction="row" spacing={4} container>
      <Grid item>
        <DataBox
          title="Current Wave Height"
          data={waveData.WVHT}
          label="feet"
        ></DataBox>
      </Grid>
      <Grid item>
        <DataBox
          title="Dominant Wave Period"
          data={waveData.DPD}
          label="seconds"
        ></DataBox>
      </Grid>
      <Grid item>
        <DataBox
          title="Average Wave Period"
          data={waveData.APD}
          label="seconds"
        ></DataBox>
      </Grid>
      <Grid item>
        <DataBox
          title="Mean Wave Direction"
          data={waveData.MWD}
          label="degrees"
        ></DataBox>
      </Grid>
      <Grid item>
        <DataBox
          title="Atmospheric Pressure"
          data={waveData.PRES}
          label="atms"
        ></DataBox>
      </Grid>
    </Grid>
  )
}
