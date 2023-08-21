import { useState, useEffect } from "react"


export default function HomePage () {
    const [message, setMessage] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

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
            console.log(dataString.length)
            const dataSplit = dataString[2].split(" ")
            console.log(dataSplit)
            const [year, month, day, hour, minute, wDir, , wSpd] = dataSplit
    
            setCurrentReading({
              day,
              month,
              year,
              hour,
              minute,
              wDir, 
              wSpd
            })
          })
          .catch((error) => {
            console.error("Error reading the file:", error)
          })
      }, [message])
      

    return (
        <>
        <p>Hello from SurfLog</p>
        {/* <p>This is a message from the backend Express server: {message}</p> */}
        <p>
          The last buoy reading was at: {currentReading.month}-{currentReading.day}-{currentReading.year}:{currentReading.hour}:{currentReading.minute} GMT time.  The wind on the Edisto buoy is currently blowing from {currentReading.wDir} degrees and the windspeed is {currentReading.wSpd}.
        </p>
        </>
    )
}