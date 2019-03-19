const Bluebird = require('bluebird')
const weather = require('weather-js')
const util = require('util')
const geoTz = require('geo-tz')
const moment = require('moment-timezone')

const now = moment()
const degreeType = 'F'
const findWeather = util.promisify(weather.find)

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Give me CSV of location names or postal codes (e.g Atlanta, 76051): `, async (input) => {
  const locations = input.split(',').map(l => l.trim())
  await Bluebird.each(locations, async location => {
    const weatherAndTime = await getLocationWeatherAndTime(location)
    console.log(`${weatherAndTime.location}: ${weatherAndTime.weather}${degreeType} (${weatherAndTime.time})`)
  })
  readline.close()
  process.exit()
})

async function getLocationWeatherAndTime(location) {
  const result = await findWeather({search: location, degreeType: degreeType})
  const timezone = geoTz(result[0].location.lat, result[0].location.long)
  const time = now.tz(timezone[0]).format('h:mm a z')

  return {
    location: result[0].location.name,
    weather: result[0].current.temperature,
    time
  }
}