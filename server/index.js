const express = require('express')
const getCachedSensorReadings = require('./get-cached-sensor-readings')
const databaseOperation = require('./database-operations')
const path = require('path')
const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', function(req, res) {
  res.json({ value: getCachedSensorReadings.getTemperature().toFixed(1)})
})

app.get('/humidity', function(req, res) {
  res.json({value: getCachedSensorReadings.getHumidity().toFixed(1)})
})

app.get('/temperature/history', function(req, res) {
  databaseOperation.fetchLatestReadings('temperature', 10, (err, results) => {
    if(err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results.reverse())
  })
})

app.get('/humidity/history',function(req, res) {
  databaseOperations.fetchLatestReadings('humidity',10, (err, results) => {
    if(err) {
        console.error(err)
      return res.status(500).end()
    }
    res.json(results.reverse())
  })
})

// add /humidity/history

app.listen(3000, function() {
  console.log('Server running on port 3000')
})