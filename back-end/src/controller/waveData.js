

const GetWaveData = async (req, res) => {
  
    //this would validate the information sent from the front end. specifically, the bouyID, the time, and data.
    //if time is now, select top 1 from cache
    //if not now but within the last 45 days, then where filter by date, time, bouyID
    //if not within the last 45 days, then fetch and filter from historical 
    
    const data = req.body

    console.log(data)
    
    return data

}