import { useState } from "react";
import { isUserLoggedIn } from "../../utilities/users-service";
import { setToken } from "../../utilities/users-service";
import { login } from "../../utilities/users-api";

export default function LoginForm ({ setUser }) {


const [credentials, setCredentials] = useState({
        username : '',
        password : ''
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
        const formData = {...credentials}
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
        <form autoComplete='off'>

           <label>Username</label>
           <input
              type='text'
              name='username'
              value={credentials.username}
              onChange={handleChange}
              required
           />

         <label>Password</label>
           <input
              type='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
              required
           />

           <button type='submit' onClick={handleSubmit}>Sign Up</button>

        </form>
        
        </>
    )
}