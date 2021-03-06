//set dotenv for API
const dotenv = require('dotenv')
dotenv.config()

console.log(`Your API key is ${process.env.pixabay_KEY}`)

let projectData = {}

// dark sky API
const darkSkyKey = process.env.darkSky_KEY

// pixabay API
const pixabayKey = process.env.pixabay_KEY
const pixabayType = '&image_type=photo'


const request = require('request')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// express
const app = express()
app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// body-parser for json
app.use(bodyParser.json())
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(express.static('dist'))

// GET route
app.get('/', function(req, res) {
  res.sendFile('dist/index.html')
})

app.get('/all', getData)

function getData(req, res) {
  res.send(projectData)
}

app.get('/darksky', (req, res) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${darkSkyKey}/${projectData.lat},${projectData.lng},${projectData.timeTag}`
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error ? error.message : 'error' })
      }

      res.json(JSON.parse(body))
    }
  )
})

app.get('/pixabay', (req, res) => {
  request(
    {
      url: `https://pixabay.com/api/?key=${pixabayKey}&q=${projectData.cityName}${pixabayType}`
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error ? error.message : 'error' })
      }

      res.json(JSON.parse(body))
    }
  )
})

// POST route
app.post('/addData/location', addLocationData)

function addLocationData(req, res) {
  let data = req.body

  projectData.lng = data.lng
  projectData.lat = data.lat
  projectData.countryName = data.countryName
  projectData.cityName = data.cityName
  projectData.myDate = data.myDate
  projectData.timeTag = data.timeTag

  res.send(projectData)
}

app.post('/removeData', removeData)

function removeData(req, res) {
  let data = req.body

  projectData = data
  res.send(projectData)
}

app.post('/addData/weather', addWeatherData)

function addWeatherData(req, res) {
  let data = req.body
  projectData.summary = data.summary
  projectData.temperatureHigh = data.temperatureHigh
  projectData.temperatureLow = data.temperatureLow

  res.send(projectData)
}

app.post('/addData/img', addImg)

function addImg(req, res) {
  let data = req.body
  projectData.cityImg = data.cityImg

  res.send(projectData)
}

app.get('/test', (req, res) => {
  res.status(200).send('autobots transform and roll out')
})

module.exports = app
