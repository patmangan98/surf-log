const { retrieveCachedData } = require("../service/waveData")
const { retrieveCurrentData } = require("../service/waveData")
const { getCurrentDate } = require('../utility')

exports.getWaveData = async (req, res) => {
  const { date, selectedBuoy } = req.query

  //If date is today's today, we need to fetch the latest readings from the text file.  If the date is not today's date but less than 44 days in the past, we need to retrieve the data from the forty_five_day_cache table in the database.  If the date is greater than 45 days old, the data will need to be retrieved from the past years historical text files.
  if (date === getCurrentDate()) {
    //The date is today, need to fetch to the NDBC to get the latest reading
    try {
        const waveData = await retrieveCurrentData(selectedBuoy)

        res.setHeader('Content-Type', 'text/plain')
        res.send(waveData)
      } catch (error) {
        res.status(500).send("Internal Server Error")
      }
  } else {//Will need another else here if it's more than 45 days
    try {
      //Retrieve data from cached records in database
        const waveData = await retrieveCachedData(date, selectedBuoy)
    
        res.json(waveData)
      } catch (error) {
        res.status(500).send("Internal Server Error")
      }
 
  }

  //this would validate the information sent from the front end. specifically, the bouyID, the time, and data.
  //if time is now, select top 1 from cache
  //if not now but within the last 45 days, then where filter by date, time, bouyID
  //if not within the last 45 days, then fetch and filter from historical
}
