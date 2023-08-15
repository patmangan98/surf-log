const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json())

let currentDate = new Date();
let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()


app.get('/message', (req, res) => {
  res.json({ message: `The SurfLog back end server is running and it is ${time} local time. ` })
})


app.listen(8000, () => {
  console.log(`Server is running on port 8000.`)
})