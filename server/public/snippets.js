/**
 * We first define a function to extract the parameters
 from the request query.
 * You do not need to be concerned too much with its
 implementation, although you could always study it as an
 excercise.
 */function getParameterByName (name){const url = window.location.href
  name = name.replace(/[\[\]]/g,'\\$&')const regex =newRegExp('[?&]'+ name +
      '(=([^&#]*)|&|#|$)')const results = regex.exec(url)if(!results)returnnullif(!results[2])return''returndecodeURIComponent(results[2].replace(/\+/g,'
  '))}const fetchTemperatureRange =()=>{/**
  * The getParameterByName function is used to get the
  "start" and "end"
  * parameters from the query
  */const start =getParameterByName('start')const end =getParameterByName('end')/**
* These parameters are then passed on to make AJAX
requests to get the range of
* readings from the server
*/fetch(`/temperature/range?start=${start}&end=${end}`).then(results =>{return results.json()}).then(data =>{
          data.forEach(reading =>{/**
             * These readings are pushed to the chart
             */const time =newDate(reading.createdAt +'Z')const formattedTime =
              time.getHours()+':'+ time.getMinutes()+':'
+ time.getSeconds()pushData(temperatureChartConfig.data.labels,
 formattedTime,10)pushData(
               temperatureChartConfig.data.datasets[0].data,
             reading.value,10)})
          temperatureChart.update()})/**
       * We also use this information to fetch the average by 
    calling the required
       * API, and updating the reading display with the result
       */fetch(`/temperature/average?start=${start}&end=${end}`).then(results =>{return results.json()}).then(data =>{
          temperatureDisplay.innerHTML ='<strong>'+
    data.value +'</strong>'})}