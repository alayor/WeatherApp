const weather = require('weather-js')
const util = require('util')
const findWeather = util.promisify(weather.find)

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Give me CSV of location names or postal codes (e.g Atlanta, 76051): `, async (input) => {
  const result = await findWeather({search: 'San Francisco, CA', degreeType: 'F'})
  console.log(JSON.stringify(result, null, 2))
  readline.close()
})