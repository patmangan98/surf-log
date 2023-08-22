import { useState } from 'react'
import { register } from '../../utilities/users-api';
import { setToken } from '../../utilities/users-service';



export default function SignUpForm ({ setUser }) {
    
const [credentials, setCredentials] = useState({
    email : '',
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
        await register(formData)
            .then((responseData) => setToken(responseData.token))
            //await console.log(formData.token)
        //await setUser(formData.token)
    
    } catch (error) {
        console.log(error)
    }
}

console.log(credentials)

    return (
        <>
        
        <form autoComplete='off'>
        <label>Email</label>
           <input
              type='email'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              required
           />

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