const geonamesURL = 'http://api.geonames.org/searchJSON?q='
const geonamesKey = '&maxRows=10&username=ducdev';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const cityName = document.getElementById('city').value;
  const myDate = document.getElementById('myDate').value;

  let d = new Date(myDate);
  let t = Math.round(d.getTime() / 1000);

  // Get city data from Geonames API
  getCityData(geonamesURL, cityName, geonamesKey).then(function(apiData) {

    const geonames = apiData.geonames;
    // Add data to endpoint
    postData('http://localhost:8081/addData', {
      lng: geonames[0]['lng'],
      lat: geonames[0]['lat'],
      cityName: cityName,
      countryName: geonames[0]['countryName'],
      myDate: myDate,
      timeTag: t
    }).then(function(projectData) {
      getWeatherData('http://localhost:8081/darksky').then(function(apiData) {
        const daily = apiData.daily.data;
        postData('http://localhost:8081/addData/weather', {
          summary: daily[0].summary,
          temperatureHigh: daily[0].temperatureHigh,
          temperatureLow: daily[0].temperatureLow
        });
        getImgData('http://localhost:8081/pixabay').then(function(apiData) {
          const cityImg = apiData['hits'][0].webformatURL;
          postData('http://localhost:8081/addData/img', {
            cityImg: cityImg
          });
          // update UI
          updateUI();
        });
      });
    });
  });
}

// TODO-Async GET
const getCityData = async (baseURL, cityName, apiKey) => {
  const request = await fetch(baseURL + cityName + apiKey);
  try {
    // transform into JSON
    const apiData = await request.json();
    return apiData;
  } catch (error) {
    console.error(error);
  }
};

const getWeatherData = async url => {
  const request = await fetch(url);
  try {
    // transform into JSON
    const apiData = await request.json();
    return apiData;
  } catch (error) {
    console.error(error);
  }
};

const getImgData = async url => {
  const request = await fetch(url);
  try {
    // transform into JSON
    const apiData = await request.json();
    return apiData;
  } catch (error) {
    console.error(error);
  }
};

// Update UI
const updateUI = async () => {
  const request = await fetch('http://localhost:8081/all');
  try {
    const allData = await request.json();

    const view = document.querySelector('.view');
    view.innerHTML = "<img src='" + allData.cityImg + "' >";
    document.getElementById('weather').innerHTML = allData.summary;
    document.getElementById('temperature').innerHTML =
      'High ' +
      allData.temperatureHigh +
      ', ' +
      'Low ' +
      allData.temperatureLow;
  } catch (error) {
    console.error(error);
  }
};

// TODO-Async POST
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.error(error);
  }
};

export { performAction };