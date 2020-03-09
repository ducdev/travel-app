## Get Up and Running

We're using the APIs from darksky, pixelbay and geonames to create an application to help people plan their next trip.

This is a part of the FEND Udacity course.

## Get Up and Running

https://travel-app.ducdev.now.sh

## How to run

Clone this repo to your machine:

```
git clone git@github.com:ducdev/travel-app.git
```

Caution: pixabay & darksky API keys are stored in .env, you may need to create it on your own
- ```darkSky_KEY```
- ```pixabay_KEY```

`cd` into project folder and run:
- ```npm install```
- ```npm test``` to test the web app
- ```npm run build-dev``` to build a development bundle
- ```npm run build-prod``` to build a production bundle
- ```npm start``` to start the web app
- this web app runs on localhost:8081, but you can change the port in server.js
