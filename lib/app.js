
require('dotenv').config();

const express = require('express');
const cors = require('cors');
//const client = require('./client.js');
const app = express();
// const morgan = require('morgan');
// const ensureAuth = require('./auth/ensure-auth');
// const createAuthRoutes = require('./auth/create-auth-routes');
const { geoMunge } = require('../geo.js');
const { weatherMunge } = require('../weather.js');
const request = require('superagent');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(morgan('dev')); // http logging

//const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
//app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
//app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
// app.get('/api/test', (req, res) => {
//   res.json({
//     message: `in this protected route, we get the user's id like so: ${req.userId}`
//   });
// });


app.get('/location', async (req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOLOCATION_KEY}&q=${req.query.search}&format=json`;

    const response = await request.get(URL);

    const newResponse = geoMunge(response.body);

    console.log(response, newResponse)
    res.json(newResponse);


  } catch (e) {
    res.json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHERBIT_KEY}`;

    const response = await request.get(URL);

    const newResponse = weatherMunge(response.body);

    console.log(response, newResponse)
    res.json(newResponse);


  } catch (e) {
    res.json({ error: e.message });
  }
});

// app.get('/location', async (req, res) => {
//   try {
//     const mungedData = geoMunge(geoData);
//     res.json(mungedData);
//   } catch (e) {
//     res.json({ error: e.message })
//   }
// });



app.use(require('./middleware/error'));

module.exports = app;
