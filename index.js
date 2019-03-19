const weather = require('weather-js')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Want weather?`, (name) => {
  weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function (err, result) {
    if (err) console.log(err);

    console.log(JSON.stringify(result, null, 2))
  })

  readline.close()
})