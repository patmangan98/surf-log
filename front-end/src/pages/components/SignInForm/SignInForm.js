



export default function SignUpForm () {
    
    return (
        <>
        
        <form autoComplete='off'>
        <label>Email</label>
           <input
              type='email'
              name='email'
              required
           />
         <label>Password</label>
           <input
              type='password'
              name='password'
              required
           />

           <button type='submit'>Sign Up</button>

        </form>
        
        
        </>


    )



}