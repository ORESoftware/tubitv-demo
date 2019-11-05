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

if (process.env.NODE_ENV === 'local') {
  log.warn('node env is set to "local" see we are debugging mongoose queries.');
  // mongoose.set('debug', true);
  mongoose.set('debug', function (coll: string, method: string, query: string, doc: string) {
    log.debug('===================================================================');
    log.debug('Query executed:');
    log.debug('collection:', util.inspect(coll));
    log.debug('method:', util.inspect(method));
    log.debug('data/query:', util.inspect(query));
    doc && log.debug('doc:', util.inspect(doc));
  });
}

const conn = mongoose.connection;

conn.on('error', function (err) {
  log.error('mongodb connection error [2]:', err);
});

conn.once('open', function () {
  log.info('mongodb connected.');
});

export {conn};
