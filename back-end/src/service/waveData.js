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
    // console.log(labels)
//    console.log(rawArray)
// [
//     '2023',   '09',   '08',
//     '22',     '00',   '10',
//     '1.0',    '1.0',  'MM',
//     'MM',     'MM',   'MM',
//     '1013.6', '28.6', '28.2',
//     '24.8',   'MM',   '-0.4',
//     'MM'
//   ]

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

    // console.log(rawDataMatrix)

    // declare another matrix that will Only contain data points which include a measurement for wave hieght (index 9) and DPD (index 10)
    let sortedMatrix = []

    for(let i = 0; i < rawDataMatrix.length; i++) {
        
    }


}

module.exports = {
    fetchAndProccessData
}