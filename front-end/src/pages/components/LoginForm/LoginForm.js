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

      <Grid container direction="row" justifyContent="center">
        <Card
          className="form-container"
          sx={{
            borderRadius: "20px",
            boxShadow: "3px 2px 7px rgb(0, 0, 0, 0.5)",
          }}
        >
          <CardContent sx={{ display: "grid", margin: "20px" }}>
            <Typography
              fontFamily="monospace"
              fontWeight="700"
              display="flex"
              justifyContent="center"
              fontSize="30px"
              color="#0288d1"
            >
              SURFBOARD
            </Typography>

            <Typography
              fontFamily="monospace"
              fontWeight="700"
              display="flex"
              justifyContent="center"
              fontSize="20px"
              color="#0288d1"
            >
              An Online Surf Journal
            </Typography>

            <Typography variant="h6" fontWeight="bold" mt="10px">
              Sign in
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
    </>
  )
}
