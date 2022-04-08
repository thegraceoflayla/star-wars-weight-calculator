const express = require('express');
const PORT = 1235;
let app = express();

app.use(express.static('./client/dist'));

app.listen(PORT, () => {
  console.log(`App listening on localhost:${PORT}...`);
});