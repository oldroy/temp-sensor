const sensor = require('node-dht-sensor')

const getSensorReadings = (callback) => {
  sensor.read(22, 12, function (err, temperature, humidity) {
    if (err) {
      return callback(err)
    }
    callback(null, temperature, humidity)
  })
}

module.exports = getSensorReadings