const fs = require('fs');
const glob = require('glob');
const moveFile = require('move-file');
require('dotenv').config();
const logger = require('../logger/Logger');

const WordReader = {
  async readDump(directory) {
    const filesWithDirectory = await this.getFilesFromDirectory(directory);
    if (filesWithDirectory != null) {
      this.getEachFileSeperatlyAndProccesIt(filesWithDirectory);
    }
  },

  getEachFileSeperatlyAndProccesIt(filesWithDirectory) {
    filesWithDirectory.forEach((fileWithDirectory) => {
      this.readFileAndProcessIt(fileWithDirectory);
      logger.data.info(`${fileWithDirectory} fully procest and will now be moved.`);
      this.splitFileFromDirectoryAndMoveFile(fileWithDirectory);
    });
  },

  readFileAndProcessIt(fileWithDirectory) {
    logger.data.info(`Reading file: ${fileWithDirectory}`);
    fs.readFile(fileWithDirectory, 'utf8', (err, data) => {
      if (err) {
        this.errorHandling(err);
      }
      const content = data;
      this.processFile(content);
    });
  },

  getFilesFromDirectory(directory) {
    logger.data.info(`Getting all files from the following directory: ${directory}`);
    return new Promise((resolve) => (
      glob(directory.concat('/*.txt'), (err, files) => {
        if (err) {
          this.errorHandling(err);
        }
        return resolve(this.returnFilesFromDirectory(files, directory));
      })));
  },

  returnFilesFromDirectory(files, directory) {
    if (files.length !== 0) {
      logger.data.info(`${files.length} files has been found`);
      return files;
    }
    logger.data.info(`No files found in the following directory: ${directory}`);
    return null;
  },

  splitFileFromDirectoryAndMoveFile(fileWithDirectory) {
    const parts = fileWithDirectory.split('/');
    const lastPart = parts[parts.length - 1];
    this.moveFileFromOriginToTarget(lastPart,
      process.env.TO_PROCESS_FILE_FOLDER,
      process.env.PROCESSED_FILE_FOLDER);
  },

  moveFileFromOriginToTarget(file, origin, target) {
    try {
      logger.data.info(`Moving ${file} from ${origin} to ${target}`);
      moveFile(origin.concat(file), target.concat(file));
      logger.data.info(`Moving ${file} is succesfull!`);
    } catch (err) {
      this.errorHandling(err);
    }
  },

  processFile(content) {
    console.log(content);
  },

  errorHandling(err) {
    logger.data.error(`Something went wrong: ${err}`);
    throw err;
  },
};

exports.data = WordReader;
