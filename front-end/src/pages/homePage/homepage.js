import { useState, useEffect } from "react"
import { clearToken } from "../../utility"
import { addNewPost } from '../../api'
import { deletePost } from '../../api'
import { updatePost } from '../../api'
import { getToken } from '../../utility'

export default function HomePage ({ setUser }) {
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
      

      function handleLogOut () {
        clearToken()
        setUser()
      }
     
      //Dummy post data
      const post = {
        
        user_id: "1",
        post_date: "2023-09-03",
        post_description: "New New Post",
        post_location: "Rincon Californina",
        WDIR: "270",
        WSPD: "5.2",
        GST: "5.6",
        WVHT: "2.2",
        DPD: "6.3",
        APD: "5.2",
        MWD: "155",
        PRES: "29.24"
      }
      const token = getToken()
      const handleNewPost = () => {
        addNewPost(post)
      }

      const handleDelete = () => {
        const post_id = 4
        deletePost(post_id)
      }

      const handleUpdate = () => {
        updatePost(post)
      }

    return (
        <>
        <p>Hello from SurfLog</p>
        {/* <p>This is a message from the backend Express server: {message}</p> */}
        <p>
          The last buoy reading was at: {currentReading.month}-{currentReading.day}-{currentReading.year}:{currentReading.hour}:{currentReading.minute} GMT time.  The wind on the Edisto buoy is currently blowing from {currentReading.wDir} degrees and the windspeed is {currentReading.wSpd}.
        </p>
        <button onClick={handleNewPost}>Add New Post</button>
        <button onClick={handleDelete}>Delete A Post</button>
        <button onClick={handleUpdate}>Update A Post</button>
        <button onClick={handleLogOut}>Log-Out</button>
        </>
    )
}