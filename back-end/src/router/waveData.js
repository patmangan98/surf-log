const { fetchAndProccessData, updateCache } = require('../service/waveData')
const { getWaveData } = require('../controller/waveData')


const waveData = (app) => {

app.get('/data', updateCache)
app.get('/getdata', getWaveData)

}

module.exports = waveData