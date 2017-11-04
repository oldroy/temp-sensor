const express = require('express')
const getSensorReadings = require('./get-sensor-readings')

const app = express()


app.get('/temperature', function(req, res) {
  getSensorReadings((err, temperature, humidity) => {
    if (!err) {
      res.send(temperature.toFixed(1) + ' *C')
    }
  })
})

app.get('/humidity', function(req, res) {
  getSensorReadings((err, temperature, humidity) => {
    if (!err) {
      res.send(humidity.toFixed(1) + '%')
    }
  })
})

app.listen(3000, function() {
  console.log('Server running on port 3000')
})