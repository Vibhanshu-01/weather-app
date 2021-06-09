// const request = require('request')


// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=33903c8aa52d30d28267ae43abb9b075&query=' + decodeURIComponent(latitude)+','+ decodeURIComponent(longitude) +'&units=f'
//     request({url , json: true}, (error, {body}) => {
//          if(error)
//          {
//             callback('Network connection error', undefined)
//          } else if(body.error){
//             callback('Location not found , try and search another adress', undefined)
//          } else {
//               const curdata = body.current
//               callback( undefined ,curdata.weather_descriptions + '. It is currently  ' + curdata.temperature + ' degrees out today and it feels like '+ curdata.feelslike + ' degrees out ' ) 
//          }
//     })
// }


// module.exports = forecast


const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33903c8aa52d30d28267ae43abb9b075&query=' + decodeURIComponent(latitude)+','+ decodeURIComponent(longitude) +'&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
         const curdata = body.current
                  callback( undefined ,curdata.weather_descriptions + '. It is currently  ' + curdata.temperature + ' degrees out today and it feels like '+ curdata.feelslike + ' degrees out ' ) 
  //          callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast