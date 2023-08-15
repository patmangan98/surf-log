import "./App.css"
import React, { useState, useEffect } from "react"

function App() {
 
  let dataSplit = []
  const [message, setMessage] = useState("")
  
  const [currentReading, setCurrentReading] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: ""
  });

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  const fileUrl =
    "data/realtime2/41004.txt"
  
  fetch(fileUrl)
    // fetch(fileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.text()
    })
    .then((fileContent) => {
      // Process the file content here

      const dataString = fileContent.split("\n")
      
      dataSplit = dataString[2].split(" ")
      
      setCurrentReading({
        ...currentReading,
        day: dataSplit[2],
        month: dataSplit[1],
        year: dataSplit[0],
        hour: dataSplit[3],
        minute: dataSplit[4]
      })

      // You can save the file content to a variable or use it as needed
      // For example, you can pass it to another function for further processing
      // yourFunctionToProcessFileContent(fileContent);
    })
    .catch((error) => {
      console.error("Error reading the file:", error)
    })

   

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Hello from SurfLog</p>
        <p>This is a message from the back end Express server: {message}</p>
        <p>The last buoy reading was at: {currentReading.month}-{currentReading.day}-{currentReading.year}:{currentReading.hour}:{currentReading.minute} GMT time.</p>
      </header>
    </div>
  )
}

export default App
