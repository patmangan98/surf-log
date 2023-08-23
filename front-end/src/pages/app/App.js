import "./App.css"
import React from "react"
import { useState} from "react"
import { getToken } from '../utilities/users-service'
import { updatePassword } from '../utilities/users-api'
import { isUserLoggedIn } from '../utilities/users-service'
import HomePage from "../homePage/homepage"
import AuthPage from "../AuthPage/AuthPage"


export default function App() {
  
  const [user, setUser] = useState(isUserLoggedIn())





  const handlePasswordChange = async () => {
    try {
      const token = getToken()
      const data = { password: 'thisisanewpas8687jht' }
      await updatePassword(token, data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <main className="App">
      {user ? (
        <>
          <HomePage setUser={setUser} />
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}


    </main>
  )
}


