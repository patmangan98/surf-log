import "./App.css"
import React, { useState, useEffect } from "react"

function App() {
  const [message, setMessage] = useState("")

  const [currentReading, setCurrentReading] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: ""
  })

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching message:", error)
      })

    const fileUrl = "data/realtime2/41004.txt"

    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.text()
      })
      .then((fileContent) => {
        const dataString = fileContent.split("\n")
        const dataSplit = dataString[2].split(" ")
        const [year, month, day, hour, minute] = dataSplit

        setCurrentReading({
          day,
          month,
          year,
          hour,
          minute
        })
      })
      .catch((error) => {
        console.error("Error reading the file:", error)
      })
  }, [message])
  console.log(message)
  console.log(currentReading.month)

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello from SurfLog</p>
        <p>This is a message from the backend Express server: {message}</p>
        <p>
          The last buoy reading was at: {currentReading.month}-{currentReading.day}-{currentReading.year}:{currentReading.hour}:{currentReading.minute} GMT time.
        </p>
      </header>
    </div>
  )
}

export default App

