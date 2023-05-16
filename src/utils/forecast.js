const request = require ('request')

const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d62a7d567471aeff2d3bbf408679a6e1&query=' + lat +',' + lon+'/'
    request({url: url, json:true}, (error, response)=>{
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (response.body.current === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
        callback (undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees')


    }})


}

module.exports = forecast
