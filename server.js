const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;




app.use(cors());

/*
{
  "formatted_query": "Seattle, WA, USA",
  "latitude": "47.606210",
  "longitude": "-122.332071"
}
*/



// app.get('/location', async (req, res) => {
//   try {
//     const mungedData = geoMunge(geoData);
//     res.json(mungedData);
//   } catch (e) {
//     res.json({ error: e.message })
//   }
// });





app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on http://localhost:${PORT}`);
});
