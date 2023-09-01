import { useState } from "react";
import { isUserLoggedIn } from "../../utilities/users-service";
import { setToken } from "../../utilities/users-service";
import { login } from "../../utilities/users-api";
import { Paper, Button, TextField, Divider, Stack, Typography } from '@mui/material'

export default function LoginForm({ setUser, setSignUpVisible, handleToggle}) {


    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })


    function handleChange(event) {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const formData = { ...credentials }
            await login(formData)
                .then((responseData) => setToken(responseData.token))
            await setUser(isUserLoggedIn())

            //await console.log(formData.token)
            //await setUser(formData.token)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Paper
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
                    marginRight: 'auto',
                    marginTop: '10vw'
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
                            sx={{ width: '9.5vw' }}

                        />

                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label='Password'
                            type='password'
                            name='password'
                            value={credentials.password}
                            onChange={handleChange}
                            sx={{ width: '9.5vw' }}
                        />

                        <Button
                            type='submit'
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ width: '15ch', alignSelf: 'center' }}
                        >
                        Login </Button>

                    </Stack>

                </form>

               
            </Paper>
            <br></br>
            <br></br>
            <Button 
            variant="caption"
            onClick={handleToggle}
            >
                

                Did you mean to Sign-Up?
                </Button>

        </>
    )
}