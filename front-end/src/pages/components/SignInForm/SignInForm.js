import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { register } from "../../utilities/users-api"
import { setToken } from "../../utilities/users-service"
import { setUserId } from '../../utilities/users-service'
import { isUserLoggedIn } from "../../../utility"
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  duration,
} from "@mui/material"
import { useMyContext } from "../context/MyContext"

export default function SignUpForm({ setUser, handleToggle }) {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  })

  const [errorMsg, setErrorMsg] = useState("")

  const { updateMyState } = useMyContext()

  function handleChange(event) {
    console.log(event.target.value)
    console.log(event.target.name)
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    const formData = { ...credentials }
    try {
      await register(formData).then((responseData) => {
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
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container direction="row" justifyContent="center">
            <Card
              className="form-container"
              sx={{
                borderRadius: "10px",
              }}
            >
              <CardContent sx={{ display: "grid", margin: "15px" }}>
                <Typography variant="h6" fontWeight="bold" mt="10px">
                  Sign Up
                </Typography>
                <Typography color="red" variant="caption">
                  {errorMsg}
                </Typography>
                <Grid container direction="column" justify="center">
                  <TextField
                    className="form"
                    label="Email"
                    type="email"
                    name="email"
                    sx={{ marginBottom: "15px", marginTop: "10px" }}
                    required
                    value={credentials.email}
                    onChange={handleChange}
                  />
                  <TextField
                    className="form"
                    id="outlined-password-input"
                    label="Username"
                    name="username"
                    sx={{ marginBottom: "5px" }}
                    required
                    value={credentials.username}
                    onChange={handleChange}
                  />
                  <TextField
                    className="form"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    sx={{ marginBottom: "5px", paddingTop: "10px" }}
                    required
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "90px",
                    mt: "10px",
                    display: "flex",
                    justifySelf: "center",
                  }}
                  onClick={() => handleSubmit()}
                >
                  sign in
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Button
            variant="caption"
            sx={{ marginTop: "20px" }}
            onClick={handleToggle}
          >
            Did you mean to Log-in?
          </Button>
        </motion.div>
      </div>
    </>
  )
}
