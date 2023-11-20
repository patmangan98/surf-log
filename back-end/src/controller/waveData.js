const { retrieveCachedData } = require("../service/waveData")
const { retrieveCurrentData } = require("../service/waveData")
const { retrieveHistoricalData } = require("../service/waveData")
const {
  getCurrentDate,
  isGreaterThan45Days,
  getYearFromDate,
  getMonthFromDate,
} = require("../utility")

exports.getWaveData = async (req, res) => {
  const { date, selectedBuoy } = req.query
  //If date is today's today, we need to fetch the latest readings from the text file.  If the date is not today's date but less than 44 days in the past, we need to retrieve the data from the forty_five_day_cache table in the database.  If the date is greater than 45 days old, the data will need to be retrieved from the past years historical text files.

  if (date === getCurrentDate()) {
    //The date is today, need to fetch to the NDBC to get the latest reading
    try {
      const waveData = await retrieveCurrentData(selectedBuoy)
      res.setHeader("Content-Type", "text/plain")
      res.send(waveData)
    } catch (error) {
      res.status(500).send("Internal Server Error")
    }
  } else if (isGreaterThan45Days(date, getCurrentDate())) {
    //The date is more than 45 days in the past, we need to do historical fetching
    const month = getMonthFromDate(date)
    const year = getYearFromDate(date)
    const waveData = await retrieveHistoricalData(selectedBuoy, month, year)
    res.setHeader("Content-Type", "text/plain")
    res.send(waveData)
  } else {
    //Date is within 45 days, retrieve data from cached records in database
    try {
      const waveData = await retrieveCachedData(date, selectedBuoy)
      res.json(waveData)
    } catch (error) {
      res.status(500).send("Internal Server Error")
    }
  }
}
