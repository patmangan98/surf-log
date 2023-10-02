import { useState } from "react"
import { isUserLoggedIn } from "../../utilities/users-service"
import { setToken } from "../../utilities/users-service"
import { setUserId } from '../../utilities/users-service'
import { login } from "../../utilities/users-api"
import {
  Card,
  Button,
  TextField,
  Typography,
  Grid,
  CardContent,
  
} from "@mui/material"
import { motion } from "framer-motion"
import { useMyContext } from "../context/MyContext"

export default function LoginForm({ setUser, setSignUpVisible, handleToggle }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const { updateMyState } = useMyContext()

  const [errorMsg, setErrorMsg] = useState("")

  function handleChange(event) {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    const formData = { ...credentials }
    try {
      await login(formData).then((responseData) => {
        setToken(responseData.token)
        setUserId(responseData.userId)
      })

      return setUser(isUserLoggedIn())
    } catch (error) {
      console.log("READ THE ERROR HERE:", error)
      if (error) {
        setErrorMsg(`${error.toString().substr(26)}`)
      }
    }
  }

  return (
    <>
      <div className="background">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            mass: 1,
            velocity: 2,
            //  duration: 0.8,
            // //  delay: 0.5,
            //  ease: 'easeInOut'
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems={"center"}
          >
            <Card
              className="form-container"
              sx={{
                borderRadius: "10px",
              }}
              elevation={5}
              borderRadius={"20px"}
            >
              <CardContent sx={{ display: "grid", margin: "15px" }}>
                <Typography variant="h6" fontWeight="bold" mt="10px">
                  Log-In
                </Typography>
                <Typography color="red" variant="caption">
                  {errorMsg}
                </Typography>
                <Grid container direction="column" justify="center">
                  <TextField
                    className="form"
                    label="Username"
                    sx={{ marginBottom: "15px", marginTop: "10px" }}
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                  />
                  <TextField
                    className="form"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    sx={{ marginBottom: "5px" }}
                    value={credentials.password}
                    onChange={handleChange}
                  />
                  <br></br>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ width: "15ch", alignSelf: "center" }}
                  >
                    Log-In{" "}
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Button
            variant="caption"
            sx={{ marginTop: "20px" }}
            onClick={handleToggle}
          >
            Did you mean to Sign-Up?
          </Button>
        </motion.div>
      </div>
    </>
  )
}
