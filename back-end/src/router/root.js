const root = (app) => {
  app.get('/', (req, res) => {
    res.json({message: 'Hello SurfLog'})
  })
}

module.exports = root