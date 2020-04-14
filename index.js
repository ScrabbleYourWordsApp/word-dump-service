const express = require('express');
require('dotenv').config();

const Reader = require('./wordReader/WordReader.js');
const logger = require('./logger/Logger');

const app = express();
const port = process.env.PORT || '8080';

app.get('/', (req, res) => {
  res.status(200).send('Word dump Service is up and running!');
});

app.listen(port, () => {
  logger.data.info('Word Dump Services started');
  Reader.data.readDump(process.env.TO_PROCESS_FILE_FOLDER);
});
