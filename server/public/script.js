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

const fetchHumidity = () => {
  fetch('/humidity')
      .then(results => {
        return results.json()
      })
      .then(data => {
        const humidityDisplay = document.getElementById('humidity-display')
        humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
      })
}

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
