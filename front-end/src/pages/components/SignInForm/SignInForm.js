import { useState } from "react"
import { register } from "../../utilities/users-api"
import { setToken } from "../../utilities/users-service"
import { isUserLoggedIn } from "../../../utility"
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material"

export default function SignUpForm({ setUser, handleToggle }) {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  })

  const [errorMsg, setErrorMsg] = useState("")

  function handleChange(event) {
    console.log(event.target.value)
    console.log(event.target.name)
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    // event.preventDefault();
    try {
      const formData = { ...credentials }
      console.log(formData)
      await register(formData).then((responseData) =>
        setToken(responseData.token)
      )
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

                <Typography variant="h6" sx={{ mb: 2 }}>Sign-up</Typography>

                <Typography color='red' variant='caption'>{errorMsg}</Typography>

                <form autoComplete='off'>

                    <Stack spacing={2}>

                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Email"
                            type='email'
                            // name='email'
                            // value={credentials.email}
                            // onChange={handleChange}
                            required
                        />

                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Username"
                            type='text'
                            // name='username'
                            // value={credentials.username}
                            // onChange={handleChange}
                            required
                        />

                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Password"
                            // type='password'
                            // name='password'
                            // value={credentials.password}
                            // onChange={handleChange}
                            required
                        />

                        <Button
                            type='submit'
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ width: '15ch', alignSelf: 'center' }}
                        >Sign Up</Button>

                    </Stack>

                </form>

            </Paper>

            <br></br>

            <br></br>

            <Button
                variant='caption'
                onClick={handleToggle}
            >
                Did you mean to Log-in?
            </Button> */}

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
            <br></br>
            <Button variant="caption" onClick={handleToggle}>
              Did you mean to Log-in?
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
