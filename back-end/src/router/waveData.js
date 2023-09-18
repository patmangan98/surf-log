const { fetchAndProccessData, updateCache } = require('../service/waveData')


const waveData = (app) => {

app.get('/data', updateCache)

}

module.exports = waveData