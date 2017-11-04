const fetchTemperature = () => {
  fetch('/temperature')
      .then(results => {
        return results.json()
      })
      .then(data => {
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

/**
 * Get the context of the temperature canvas element
 */
const temperatureCanvasCtx =
    document.getElementById('temperature-chart').getContext('2d')

/**
 * Create a new chart on the context we just instantiated
 */
const temperatureChart = new Chart(temperatureCanvasCtx,
    {
      /**
       * Were going to show the ongoing temperature as a line chart
       */
      type:'line',
      data:{
        /**
         * This is mock data.
         * The labels, which will form our x-axis, are
         supposed to represent the time at which each reading was
         taken.
         * Finally, we add the dataset, whose data is an
         array of temperature values.
         * The background color is set to the same value as
         the earlier display, with some added transparency (which
         is why the 'rgba' representation is used)
         */
        labels:['10:30','10:31','10:32','10:33'],
        datasets:[{
          data:[12,19,23,17],
          backgroundColor:'rgba(255, 205, 210, 0.5)'
        }]
      },
      options:{
        /**
         * There is no need for a legend since there is only
         one dataset plotted
         * The 'responsive' and 'maintainAspectRatio' options
         are set so that the chart takes the width and height of
         the canvas, and does not set it on its own.
         */
        legend:{
          display:false
        },
        responsive:true,
        maintainAspectRatio:false
      }
    })