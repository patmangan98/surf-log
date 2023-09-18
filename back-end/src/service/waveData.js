const knex = require('../knex')

const id = '41004'

 
const fetchAndProccessData = async () => {
    //this is temporarily hard coded. the backslash after realtime is where the bouyid will go
    const fetchUrl = `https://www.ndbc.noaa.gov/data/realtime2/${id}.txt`
    console.log(`Fetching data from bouy : ${id}`)
    const fetchData = await fetch(fetchUrl)
    const textData = await fetchData.text()
    console.log(`Fetch from bouy ${id}, is complete`)
    //spliting the text data string into an array according to lines
    const rawArray = textData.split('\n')
    //divide by spaces
    const splitData = rawArray[0].split(" ")
    //removing blanks aka " "
    const labels = splitData.filter((char) => char !== ' ' && char !== '')
    console.log('Filtering Labels Complete')
    //delcare a temp matrix
    let rawDataMatrix = []
    //loop through the raw array starting at the numbers, to create a new array that will be pushed into the matrix
    for(let i = 2; i < rawArray.length; i++) {
        //split by spaces
        let splitRaw = rawArray[i].split(" ")
        //remove the blank strings
        let filterData = splitRaw.filter((char) => char !== ' ' && char !== '')
        //push in the filtered data
        rawDataMatrix.push(filterData)
    }
    console.log(`Removing spaces from data complete, bouy: ${id}`)
    // declare another matrix that will Only contain data points which include a measurement for wave hieght (index 9) and DPD (index 10)
    let sortedMatrix = []
    for(let i = 0; i < rawDataMatrix.length; i++) {
        let subArr = rawDataMatrix[i]
        if(subArr[9] !== 'MM' && subArr[10] !== 'MM' && parseInt(subArr[3]) < 20 && subArr[5] !== 'MM' && parseInt(subArr[3]) >= 5) {
            sortedMatrix.push(subArr)
        }
    }
    console.log(`Removing uneeded data entries is complete, bouy ${id}`)
    //This is the final matrix; this will hold the concated values 
    let resultMatrix = []
    //basically, I am conncating 
    for(let i = 0; i < sortedMatrix.length; i++) {
        let subArr = sortedMatrix[i]
        let bouyId = id
        let date = (subArr[0] + '-' + subArr[1] + '-' + subArr[2])
        let time = (subArr[3] + ':' + subArr[4])
        let wdir = (subArr[5])
        let wspd = (subArr[6])
        let gst = (subArr[7])
        let wvht = (subArr[8])
        let dpd = (subArr[9])
        let apd = (subArr[10])
        let mwd = (subArr[11])
        let pres = (subArr[12])
        let concatArr = [bouyId, date, time, wdir, wspd, gst, wvht, dpd, apd, mwd, pres]
        resultMatrix.push(concatArr)
    }
 console.log(`Concating the data into a usable format is complete! bouy : ${id}`)
try {

 for(const row of resultMatrix) {
    await knex('forty_five_day_cache').insert({
        "bouy_id": row[0],
        "record_date": row[1],
        "record_time": row[2],
        "WDIR" : row[3],
        "WSPD": row[4],
        "GST": row[5],
        "WVHT": row[6],
        "DPD": row[7],
        "APD": row[8],
        'MWD': row[9],
        "PRES" : row[10]

    })
 }
  console.log(`completed insert, bouy ${id}`)

} catch(error) {
   console.error(error)     
}


//    const returnData = await knex('forty_five_day_cache').select('*')
    
//    return returnData


}


const retrieveData = async (req, res) => {
    try {
    const result = await knex() 

    } catch(error) {

    }
}
//note: use recursion for the latest date. do the sorting, then check if not mm. If blank, currentRow= index[i], function calls its self. If true, return that row, and send it to the frontend. 
//have the user send the date down, to determine if wether to grab from cache or to wether use the recursive function. 
//Also make sure they send the bouy id down (once we have that of course)


module.exports = {
    fetchAndProccessData
}