const Bluebird = require('bluebird')
const weather = require('weather-js')
const util = require('util')
const findWeather = util.promisify(weather.find)

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Give me CSV of location names or postal codes (e.g Atlanta, 76051): `, async (input) => {
  const locations = input.split(',').map(l => l.trim())
  await Bluebird.each(locations, async location => {
    const result = await findWeather({search: location, degreeType: 'F'})
    console.log(`${location}: ${result[0].current.temperature}${result[0].location.degreetype}`)
  })

  readline.close()
})