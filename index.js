const weather = require('weather-js')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Give me CSV of location names or postal codes (e.g Atlanta, 76051): `, (input) => {
  weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function (err, result) {
    if (err) console.log(err);

    console.log(JSON.stringify(result, null, 2))
  })

  readline.close()
})