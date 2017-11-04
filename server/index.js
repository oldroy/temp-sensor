const express = require('express')
const getCachedSensorReadings = require('./get-cached-sensor-readings')
const path = require('path')
const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', function(req, res) {
  res.json({ value: getCachedSensorReadings.getTemperature().toFixed(1)})
})

app.get('/humidity', function(req, res) {
  res.json({value: getCachedSensorReadings.getHumidity().toFixed(1)})
})

app.listen(3000, function() {
  console.log('Server running on port 3000')
})