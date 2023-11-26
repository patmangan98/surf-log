import Grid from "@mui/material/Grid"
import { DataBox } from "./DataBox"
import { Typography } from "@mui/material"
import '@fontsource/roboto/500.css';

export const WaveData = ({ waveData, messageText }) => {
  return (
    <Grid 
    direction="row" 
    justifyContent="center"
    alignItems="flex-start"
    spacing={2} 
    container>
       <Grid item xs={10}></Grid>
      <Grid item xs={10}>
        <Typography color='white' variant="h5" fontWeight={500}>Wave {messageText}</Typography>

      </Grid>
      {/* <Grid item xs={0}  lg={0} xl={10}></Grid>
      <Grid itme xs={0}  lg={0}  xl={10}></Grid>
      <Grid item xs={0}  lg={0} xl={10}></Grid>
      <Grid item xs={0}  lg={0} xl={10}></Grid>
      <Grid item xs={0}  lg={0} xl={10}></Grid> */}
      <Grid item xs={10}  lg={0}  xl={10}>
        <DataBox
          title="Current Wave Height"
          data={waveData.WVHT}
          label="feet"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Dominant Wave Period"
          data={waveData.DPD}
          label="seconds"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Average Wave Period"
          data={waveData.APD}
          label="seconds"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Mean Wave Direction"
          data={waveData.MWD}
          label="degrees"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Atmospheric Pressure"
          data={waveData.PRES}
          label="atms"
        ></DataBox>
      </Grid>
    </Grid>
  )
}
