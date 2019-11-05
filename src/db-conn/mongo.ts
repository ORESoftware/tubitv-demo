'use strict';

//core
import util = require('util');

//npm
import mongoose = require('mongoose');

//project
import config from '../config';
import log from '../logger';

mongoose.connect(config.db.uri, config.db.options, function (err) {
  if (err) {
    log.error('mongodb connection error [1]:', err);
    throw err
  }
});

const conn = mongoose.connection;

conn.on('error', function (err) {
  log.error('mongodb connection error [2]:', err);
});

conn.once('open', function () {
  log.info('mongodb connected.');
});

export {conn};
