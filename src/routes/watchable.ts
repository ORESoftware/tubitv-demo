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
import {User, Watchable} from '../models';
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
  
  return Watchable.findById(id)
    .lean()
    .exec()
    .then(rh.stdPromiseResp(res));
  
});



router.post('/', function (req, res, next) {
  
  const data = req.body;
  const key = data && data.key;
  const name = data && data.name;
  const sortOrder = data && data.sortOrder;
  const functionalTeams = data && data.functionalTeams;
  
  if (!String(key).startsWith('CATEGORY_')) {
    return next(
      new Error('No category could be created, because "key" does not start with "CATEGORY_".')
    );
  }
  
  if (!Number.isInteger(sortOrder)) {
    return next(
      new Error('"sortOrder" field was not an integer.')
    );
  }
  
  if (sortOrder < 1) {
    return next(
      new Error('"sortOrder" field was not a postive integer.')
    );
  }
  
  if (String(key) !== String(data.key).toUpperCase()) {
    return next(
      new Error('No category could be created, because "key" field was not uppercase.')
    );
  }
  
  if (!name) {
    return next(
      new Error('No category could be created, because no "name" field was included.')
    );
  }
  
  if (!Array.isArray(functionalTeams)) {
    return next(
      new Error('No category could be created, because functionalTeams is not array.')
    );
  }
  
  // mtxClient.ensure().then(function () {
  //   return mtxClient.lockp(lockName);
  // })
  // .then(function () {
  
  return Category.update(
    {
      sortOrder: {
        $gte: sortOrder
      }
    },
    {
      $inc: {
        sortOrder: 2
      }
    },
    {
      multi: true,
      upsert: false,
      new: true
    }
    )
    .then(function (resp) {
      
      return Category.create(data).then(function (m) {
        m.key && (caches.CategoryCache[m.key] = m);
        return m && m.toJSON() || null;
      });
      
      // });
      
    })
    .then(stdPromiseResp(res));
  
  /*
  
  // please keep this commented block

  Category.create(req.cdtBodyData).then(function (models) {

    models = _.flatten([models]);

    models.forEach(function (m) {
      m.key && (caches.CategoryCache[m.key] = m);
    });

    return models;
  })
  .then(rh.stdPromiseResp(res))
  .catch(next);
  
  */
  
});

router.delete('/by_id/:id', ac.allow('ROLE_ADMIN'), function (req, res, next) {
  
  const id = req.params.id;
  
  return Category.findByIdAndRemove(id)
    .lean()
    .exec()
    .then(rh.stdPromiseResp(res));
  
});

router.delete('/by_key/:key', ac.allow('ROLE_ADMIN'), function (req, res, next) {
  
  const key = req.params.key;
  
  if (!key) {
    return next(new Error('no key data passed to request'));
  }
  
  if (!String(key).startsWith('CATEGORY_')) {
    return next(
      new Error('No category could be deleted, because "key" does not start with "CATEGORY_".')
    );
  }
  
  return Category.remove({key})
    .exec()
    .then(function (v: typeof Category) {
      delete caches.CategoryCache[key];
      return v;
    })
    .then(rh.stdPromiseResp(res));
  
});

router.put('/by_key/:key', tc.handleBogus, function (req, res, next) {
  
  const key = req.params.key;
  const data = req.body || {};
  
  if (!String(key).startsWith('CATEGORY_')) {
    return next(
      new Error('No category could be created, because "key" does not start with "CATEGORY_".')
    );
  }
  
  if (String(key) !== String(key).toUpperCase()) {
    return next(
      new Error('No category could be created, because "key" field was not uppercase.')
    );
  }
  
  delete data.key;
  delete data._id;
  
  return Category.update({key}, data, {new: true, upsert: false})
    .lean()
    .exec()
    .then(rh.stdPromiseResp(res));
  
});

router.put('/by_id/:id', tc.handleBogus, function (req, res, next) {
  
  const id = req.params.id;
  const data = req.body || {};
  
  delete data._id;
  
  return Category.findByIdAndUpdate(id, data, {new: true})
    .lean()
    .exec()
    .then(rh.stdPromiseResp(res));
  
});

export {router};
