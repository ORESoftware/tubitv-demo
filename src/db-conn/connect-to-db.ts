'use strict';

//core
import log from "../logger";
import util = require('util');

//npm
const async = require('async');
import mongoose = require('mongoose');

//project
import {conn as db} from './mongo';
import * as cdtModels from '../models';
import {EVCb} from "../shared";


export const connectToDB =  (cb: Function) => {
  
  async.series({
    
    connectDBDriver (cb: EVCb<any>) {
      
      let callable = true;
      
      const done =  (err: any, val: any) => {
        if (callable) {
          callable = false;
          return cb.call(null, err, val)
        }
        log.warn('Multiple callbacks fired => ', util.inspect({err,val}))
      };
      
      db.once('error', done);
      db.once('open', function (msg: any) {
        done(null, msg)
      });
      
    },
    
    ensureIndexes (cb: EVCb<any>) {
      
      const modls = (cdtModels as {[key:string]: typeof mongoose.Model});
      
      async.each(mongoose.modelNames(), function (name: string, cb: EVCb<any>) {
          if(!modls[name]) {
            log.warn('no mongoose model with name:', name);
          }
          mongoose.model(name).ensureIndexes(cb)
        },
        cb
      );
    }
    
  }, cb)
  
};
