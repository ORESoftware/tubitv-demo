#!/usr/bin/env node

import semver = require('semver');

if (semver.lt(process.version, '6.5.0')) {
  throw new Error('node.js version is not up to par. please investigate. [process.version] => ' + process.version);
}

import async = require('async');
import chalk from 'chalk';
import log from './logger';


//project
log.warn('process pid:', process.pid);

import * as cdtModels  from './models';

import config from './config';
import {connectToDB} from './db-conn/connect-to-db';
import {app} from './app';
import {EVCb} from "./shared";


async.autoInject({
    dbAndMutex (cb: EVCb<any>) {
      log.debug('connecting to database');
      async.parallel([connectToDB], cb);
    }
  },
  (err) => {
    
    if (err) {
      throw err;
    }
    
  });


app.listen(config.port, () => {
  log.info('Server listening on port:', config.port);
});


app.on('error', err => {
  log.error(err);
});


