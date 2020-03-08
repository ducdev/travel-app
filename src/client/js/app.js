const geonamesURL = 'http://api.geonames.org/searchJSON?q='
const geonamesKey = '&maxRows=10&username=ducdev'

window.onload = function() {
  updateUI()
}

document.getElementById('generate').addEventListener('click', performAction)
document.getElementById('remove').addEventListener('click', removeAction)

function removeAction() {
  removeUI()
  postData('http://localhost:8081/removeData')
}

function performAction() {
  const cityName = document.getElementById('city').value
  const myDate = document.getElementById('myDate').value

  if (Client.checkForDate(myDate)) {
    let d = new Date(myDate)
    let t = Math.round(d.getTime() / 1000)
    getCityData(geonamesURL, cityName, geonamesKey).then((apiData) => {
      const geonames = apiData.geonames
      postData('http://localhost:8081/addData/location', {
        lng: geonames[0]['lng'],
        lat: geonames[0]['lat'],
        cityName: cityName,
        countryName: geonames[0]['countryName'],
        myDate: myDate,
        timeTag: t
      }).then(() => {
        getWeatherData('http://localhost:8081/darksky').then((apiData) => {
          const daily = apiData.daily.data
          postData('http://localhost:8081/addData/weather', {
            summary: daily[0].summary || 'Great!',
            temperatureHigh: daily[0].temperatureHigh,
            temperatureLow: daily[0].temperatureLow
          })
          getImgData('http://localhost:8081/pixabay').then((apiData) => {
            const cityImg = apiData['hits'][0].webformatURL
            postData('http://localhost:8081/addData/img', {
              cityImg: cityImg
            }).then(() => {
              updateUI()
            })
          })
        })
      })
    })
  } else {
    removeUI()
    document.getElementById('error-message').innerHTML =
      'Correct date format: MM/DD/YYYY'
  }
}

const getCityData = async (baseURL, cityName, apiKey) => {
  const request = await fetch(baseURL + cityName + apiKey)
  try {
    const apiData = await request.json()
    return apiData
  } catch (error) {
    console.error(error)
  }
}

const getWeatherData = async url => {
  const request = await fetch(url)
  try {
    const apiData = await request.json()
    return apiData
  } catch (error) {
    console.error(error)
  }
}

const getImgData = async url => {
  const request = await fetch(url)
  try {
    const apiData = await request.json()
    return apiData
  } catch (error) {
    console.error(error)
  }
}

const updateUI = async () => {
  document.getElementById('error-message').innerHTML = ''

  const request = await fetch('http://localhost:8081/all')
  try {
    const allData = await request.json()
    const view = document.querySelector('.view')
    if (!allData.cityImg) return
    view.innerHTML = "<img src='" + allData.cityImg + "' >"
    let timeday = Client.countdown(allData.myDate)
    document.getElementById('location').innerHTML =
      'My trip to: ' + allData.cityName + ', ' + allData.countryName
    document.getElementById('departing').innerHTML =
      'Departing: ' + allData.myDate
    document.getElementById('countdown').innerHTML =
      allData.cityName +
      ', ' +
      allData.countryName +
      ' is ' +
      timeday +
      ' days away'
    document.getElementById('show').innerHTML = 'The weather is like: '
    document.getElementById('temperature').innerHTML =
      'High ' +
      allData.temperatureHigh +
      ', ' +
      'Low ' +
      allData.temperatureLow
    document.getElementById('weather').innerHTML = allData.summary
  } catch (error) {
    console.error(error)
  }
}

const removeUI = async () => {
  const view = document.querySelector('.view')
  view.innerHTML = ''
  document.getElementById('location').innerHTML = ''
  document.getElementById('departing').innerHTML = ''
  document.getElementById('countdown').innerHTML = ''
  document.getElementById('show').innerHTML = ''
  document.getElementById('temperature').innerHTML = ''
  document.getElementById('weather').innerHTML = ''
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  try {
    const newData = await response.json()
    return newData
  } catch (error) {
    console.error(error)
  }
}

export { performAction }