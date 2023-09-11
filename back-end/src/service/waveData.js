const knex = require('../knex')

const id = '41004'

 
const fetchAndProccessData = async () => {
    //this is temporarily hard coded. the backslash after realtime is where the bouyid will go
    const fetchUrl = `https://www.ndbc.noaa.gov/data/realtime2/${id}.txt`
    const fetchData = await fetch(fetchUrl)
    const textData = await fetchData.text()
    //spliting the text data string into an array according to lines
    const rawArray = textData.split('\n')
    //divide by spaces
    const splitData = rawArray[0].split(" ")
    //removing blanks aka " "
    const labels = splitData.filter((char) => char !== ' ' && char !== '')
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
    // declare another matrix that will Only contain data points which include a measurement for wave hieght (index 9) and DPD (index 10)
    let sortedMatrix = []
    for(let i = 0; i < rawDataMatrix.length; i++) {
        let subArr = rawDataMatrix[i]
        if(subArr[9] !== 'MM' && subArr[10] !== 'MM' && parseInt(subArr[3]) < 20 && subArr[5] !== 'MM' && parseInt(subArr[3]) >= 5) {
            sortedMatrix.push(subArr)
        }
    }
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
        knex('forty_five_day_cache').insert({

            'bouy_id': bouyId,
            'record_date': date,
            'record_time': time,
            'WDIR': wdir,
            'WSPD': wspd,
            'GST': gst,
            'WVHT': wvht,
            'DPD': dpd,
            'APD': apd,
            'MWD' : mwd,
            'PRES': pres


        })
        // let concatArr = [bouyId, date, time, wdir, wspd, gst, wvht, dpd, apd, mwd, pres]
        // resultMatrix.push(concatArr)
    }
     
   const returnData = await knex
    


}

//note: use recursion for the latest date. do the sorting, then check if not mm. If blank, currentRow= index[i], function calls its self. If true, return that row, and send it to the frontend. 
//have the user send the date down, to determine if wether to grab from cache or to wether use the recursive function. 
//Also make sure they send the bouy id down (once we have that of course)


module.exports = {
    fetchAndProccessData
}