const express = require('express');

const app = express();
const port = process.env.PORT || '8080';

app.get('/', (req, res) => {
  res.status(200).send('Word dump Service is up and running!');
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
