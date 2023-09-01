import { useState } from 'react'
import { register } from '../../utilities/users-api';
import { setToken } from '../../utilities/users-service';
import { isUserLoggedIn } from '../../../utility';
import { Paper, Button, TextField, Divider, Stack, Typography } from '@mui/material'


export default function SignUpForm({ setUser,  handleToggle }) {

    const [credentials, setCredentials] = useState({
        email: '',
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
            await register(formData)
                .then((responseData) => setToken(responseData.token))
            await setUser(isUserLoggedIn())

            //await console.log(formData.token)
            //await setUser(formData.token)

        } catch (error) {
            console.log(error)
        }
    }

    console.log(credentials)

  

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
                    marginRight: 'auto'
                }}
            >

                <Typography variant="h6" sx={{ mb: 2 }}>Sign-up</Typography>

                <form autoComplete='off'>

                    <Stack spacing={2}>

                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Email"
                            type='email'
                            name='email'
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Username"
                            type='text'
                            name='username'
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Password"
                            type='password'
                            name='password'
                            value={credentials.password}
                            onChange={handleChange}
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
            </Button>

        </>


    )



}