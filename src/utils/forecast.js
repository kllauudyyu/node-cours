const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=6244dd07c29c245af9e315313e1e90be&query=${longitude},${latitude}&units=m`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `*****  ${body.current.weather_descriptions[0]}  *****. 
                        It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out. 
                    The humidity is ${body.current.humidity}% and the pressure is ${body.current.pressure}`)
        }
    })
}
module.exports = forecast