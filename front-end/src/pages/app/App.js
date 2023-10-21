import "./App.css"
import React from "react"
import { useState } from "react"
import { register } from "../../api"
import { login } from "../../api"
import { setToken } from "../../utility"
import { getToken } from "../../utility"
import { updatePassword } from "../../api"
import { isUserLoggedIn } from "../../utility"
import HomePage from "../homePage/homepage"
import AuthPage from "../AuthPage/AuthPage"
import { MyContextProvider } from '../components/context/MyContext'
import {Routes, Route, Navigate} from 'react-router-dom'
import NavBar from "../components/NavBar/NavBar"
import ViewLogsPage from "../ViewLogsPage/ViewLogsPage"

function App() {
  const [errorMsg, setErrorMsg] = useState("")
  const [user, setUser] = useState(isUserLoggedIn())
  const userId = '1'

  const handleRegister = async () => {
    try {
      const tokenValue = await register({
        email: "test@gmail.com",
        username: "pat",
        password: "Pp123456789",
      })

      setToken(tokenValue.token)
    } catch (error) {
      console.log("READ THE ERROR HERE:", error)
      if (error) {
        setErrorMsg(`${error.toString().substr(26)}`)
      }
    }
  }

  const handleLogIn = async () => {
    try {
      const tokenValue = await login({
        username: "pat",
        password: "12345",
      })
      setToken(tokenValue.token)
    } catch (error) {
      console.error(error)
      setErrorMsg("Invalid username or password.")
    }
  }

  const handlePasswordChange = async () => {
    try {
      const token = getToken()
      const data = { password: "thisisanewpas8687jht" }
      await updatePassword(token, data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MyContextProvider>
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path='/homepage' element ={<HomePage setUser={setUser} userId={userId}/>}/>
              <Route path='/logs' element={<ViewLogsPage user={user}/>}/>
              <Route path= "" element={<Navigate to ="/homepage" />}/>
            </Routes>

          {/* <HomePage setUser={setUser} userId={userId} /> */}
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}

    </main>
    </MyContextProvider>
  )
}

export default App
