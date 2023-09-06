import { useState } from "react"
import { isUserLoggedIn } from "../../utilities/users-service"
import { setToken } from "../../utilities/users-service"
import { login } from "../../utilities/users-api"
import {
  Card,
  Button,
  TextField,
  Typography,
  Grid,
  CardContent,
} from "@mui/material"

export default function LoginForm({ setUser, setSignUpVisible, handleToggle }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const [errorMsg, setErrorMsg] = useState("")

  function handleChange(event) {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    // event.preventDefault();
    try {
      const formData = { ...credentials }
      await login(formData).then((responseData) => setToken(responseData.token))
      await setUser(isUserLoggedIn())

    } catch (error) {
        console.log("READ THE ERROR HERE:", error)
        if (error) {
          setErrorMsg(`${error.toString().substr(26)}`)
        }
      }
  }

  return (
    <>
      {/* <Paper
                elevation={5}
                sx={{
                    height: "15vw",
                    width: "15vw",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: "center",
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            >

                <Typography variant="h6" sx={{ mb: 2 }}>Login</Typography>

                <form autoComplete='off'>

                    <Stack spacing={2}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Username"
                            type='text'
                            name='username'
                            value={credentials.username}
                            onChange={handleChange}
                            sx={{ width: '25ch' }}

                        />

                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label='Password'
                            type='password'
                            name='password'
                            value={credentials.password}
                            onChange={handleChange}
                            sx={{ width: '25ch' }}
                        />

                        <Button
                            type='submit'
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ width: '15ch', alignSelf: 'center' }}
                        >
                        Sign Up </Button>

                    </Stack>

                </form>

               
            </Paper>
            <br></br>
            <br></br> */}

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
          <Grid container direction="row" justifyContent="center" alignItems={"center"}>
            <Card
              className="form-container"
              sx={{
                borderRadius: "10px",
              }}
            elevation={5}
            borderRadius ={'20px'}
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
                    Sign Up{" "}
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Button variant="caption" onClick={handleToggle}>
            Did you mean to Sign-Up?
          </Button>
      </div>
    </>
  )
}
