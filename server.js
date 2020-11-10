require('dotenv').config();


const app = require('./lib/app.js');
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on http://localhost:${PORT}`);
});
