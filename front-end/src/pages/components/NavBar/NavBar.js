import {Link} from "react-router-dom" 
//Import the logout stuff here
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { clearToken } from "../../../utility"

export default function NavBar ({user, setUser}) {



//handle log out here 

function handleLogout() {
    clearToken()
    setUser()
}

    return (
        <>
        {/* <div className="NavBar"> */}
          
               <AppBar position="static">
                   
                       
                        <Grid2 
                        container
                        spacing={2}
                         sx={{ paddingY : "9px"}}
                         >
                            <Grid2>
                                <Link to='/homepage'>
                                    <Button variant="contained" disableElevation>
                                        Home
                                    </Button>
                                </Link>
                            </Grid2>
                            <Grid2>
                                <Link to='/logs'>
                                    <Button variant="contained" disableElevation>
                                        My Logs
                                    </Button>
                                </Link>
                            </Grid2>
                            <Grid2 smOffset="auto" mdOffset="auto">
                                <Link to="" onClick={handleLogout}>
                                    <Button variant="contained" disableElevation>
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