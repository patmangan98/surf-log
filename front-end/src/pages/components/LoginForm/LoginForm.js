export default function LoginForm () {
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