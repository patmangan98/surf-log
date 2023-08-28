const express = require('express')
const cors = require('cors')
const { pathLogger } = require('./middleware/logger')
const router = require('./router')

const app = express()

app.use(cors());
app.use(express.json())
app.use(pathLogger)

router(app)

let currentDate = new Date();
let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
console.log(time)

app.get('/message', (_req, res) => {
  res.json({ message: `The SurfLog back end server is running and it is ${time} local time. ` })
})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`)
})


