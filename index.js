const express = require('express');
require('dotenv').config();
const cron = require('node-cron');

const Reader = require('./wordReader/WordReader.js');
const logger = require('./logger/Logger');

const app = express();
const port = process.env.PORT || '8080';

app.get('/', (req, res) => {
  res.status(200).send('Word dump Service is up and running!');
});

app.listen(port, () => {
  logger.data.info('Word Dump Services started');
  logger.data.info('On startup reads all files from folder');
  Reader.data.readDump(process.env.TO_PROCESS_FILE_FOLDER);
});

cron.schedule('*/10 * * * *', () => {
  logger.data.info('Cron job started, this happens every 10 min');
  Reader.data.readDump(process.env.TO_PROCESS_FILE_FOLDER);
});
