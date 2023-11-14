import { Link } from "react-router-dom"
//Import the logout stuff here
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { clearToken } from "../../../utility"

export default function NavBar({ user, setUser }) {
  //handle log out here

  function handleLogout() {
    clearToken()
    setUser()
  }

  return (
    <>
      {/* <div className="NavBar"> */}

      <AppBar position="static" sx={{ 
        top: 'auto', 
        bottom: 0,
        backgroundColor :'rgba(1, 36, 58, 1)'
        }} >
        <Grid2 container spacing={2} sx={{ paddingY: "9px" }}>
          <Grid2>
            <Link to="/homepage">
              <Button variant="contained" disableElevation 
              sx={{
                backgroundColor :'rgba(1, 36, 58, 1)'
              }}>
                Home
              </Button>
            </Link>
          </Grid2>
          <Grid2>
            <Link to="/logs">
              <Button variant="contained" disableElevation
               sx={{
                backgroundColor :'rgba(1, 36, 58, 1)'
              }}>
                My Logs
              </Button>
            </Link>
          </Grid2>
          <Grid2 smOffset="auto" mdOffset="auto">
            <Link to="" onClick={handleLogout}>
              <Button variant="contained" disableElevation 
              sx={{
                backgroundColor :'rgba(1, 36, 58, 1)'
              }}>
                Log Out
              </Button>
            </Link>
          </Grid2>
        </Grid2>
      </AppBar>
    
      {/* </div> */}
    </>
  )
}
