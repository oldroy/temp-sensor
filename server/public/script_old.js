const fetchTemperature = () => {
  fetch('/temperature')
      .then(results => {
        return results.json()
      })
      .then(data => {
        const now = new Date()
        const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
        pushData(temperatureChartConfig.data.labels, timeNow, 10)
        pushData(temperatureChartConfig.data.datasets[0].data, data.value, 10)
        temperatureChart.update()

        const temperatureDisplay = document.getElementById('temperature-display')
        temperatureDisplay.innerHTML = '<strong>' + data.value + '</strong>'
      })
}

const fetchTemperatureHistory = () => {
  fetch('/temperature/history').then(results => {
    return results.json()
  })
      .then(data => {
        data.forEach(reading => {
          const time = new Date(reading.createdAt = 'Z')
          const formattedTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
          pushData(temperatureChartConfig.data.labels, formattedTime, 10)
          pushData(temperatureChartConfig.data.datasets[0].data, reading.value, 10)
        })
        temperatureChart.update()
      })
}

const fetchHumidity = () => {
  fetch('/humidity')
      .then(results => {
        return results.json()
      })
      .then(data => {
        const now = new Date()
        const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
        pushData(humidityChartConfig.data.labels, timeNow, 10)
        pushData(humidityChartConfig.data.datasets[0].data, data.value, 10)
        humidityChart.update()

        const humidityDisplay = document.getElementById('humidity-display')
        humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
      })
}

const fetchHumidityHistory = () => {
  fetch('/humidity/history').then(results => {
    return results.json()
  })
      .then(data => {
        data.forEach(reading => {
          const time = new Date(reading.createdAt = 'Z')
          const formattedTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
          pushData(humidityChartConfig.data.labels, formattedTime, 10)
          pushData(humidityChartConfig.data.datasets[0].data, reading.value, 10)
        })
        humidityChart.update()
      })
}



fetchTemperatureHistory()
fetchHumidityHistory()

setInterval(() => {
  fetchTemperature()
  fetchHumidity()
}, 5000)

const pushData = (arr, value, maxLen) => {
  arr.push(value)
  if(arr.length > maxLen) {
    arr.shift()
  }
}

/**
 * Get the context of the temperature canvas element
 */
const temperatureCanvasCtx =
    document.getElementById('temperature-chart').getContext('2d')

const temperatureChartConfig = {
  type: 'line',
  data: {
    labels:[],
    datasets:[{
      data:[],
      backgroundColor:'rgba(255, 205, 210, 0.5)'
    }]
  },
  options: {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes:[{
        ticks:{
          suggestedMin:10,
          suggestedMax:40
        }
      }]
    }
  }
}

const temperatureChart = new Chart(temperatureCanvasCtx, temperatureChartConfig)

const humidityCanvasCtx =
    document.getElementById('humidity-chart').getContext('2d')

const humidityChartConfig ={
  type:'line',
  data:{
    labels:[],
    datasets:[{
      data:[],
      backgroundColor:'rgba(197, 202, 233, 0.5)'
    }]
  },
  options:{
    legend:{
      display:false
    },
    responsive:true,
    maintainAspectRatio:false,
    scales:{
      yAxes:[{
        ticks:{
          suggestedMin:0,
          suggestedMax:100
        }
      }]
    }
  }
}

const humidityChart = new Chart(humidityCanvasCtx, humidityChartConfig)