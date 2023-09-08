const { fetchAndProccessData } = require('../service/waveData')


const waveData = (app) => {

app.get('/data', fetchAndProccessData)

}

module.exports = waveData