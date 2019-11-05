'use strict';

//dts
import * as express from 'express';
import {Router, RequestHandler} from 'express';

//core
import assert = require('assert');

// npm
const router = express.Router();
import mongoose = require('mongoose');
import async = require('async');

//project
import {User} from '../models';
import * as rh from './helper';


router.get('/',  (req: any, res, next) => {
  
  const q = req.parsedFilterParam;
  
  return User.find(q)
    .lean()
    .exec()
    // .populate(...populate)
    .then(rh.stdPromiseResp(res))
  
});

router.get('/by_id/:id', function (req, res, next) {
  
  const id = req.params.id;
  
  return User.findById(id)
    .lean()
    .exec()
    .then(rh.stdPromiseResp(res));
  
});



router.delete('/by_id/:id', function (req, res, next) {
  
  const id = req.params.id;
  
  return User.findByIdAndRemove(id)
    .lean()
    .exec()
    .then(rh.stdPromiseResp(res));
  
});


export {router};
