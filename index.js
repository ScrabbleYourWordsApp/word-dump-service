const express = require('express');
const env = require('dotenv').config();
const app = express();
const port = process.env.PORT || '8080';

app.get('/', (req, res) => {
  res.status(200).send('Word dump Service is up and running!');
});

app.listen(port, () => {
  console.log(`Listening to requests: http://localhost:${port}`);
});
