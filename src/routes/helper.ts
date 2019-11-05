'use strict';

import * as _ from 'lodash';
import {Response} from "express";

export const stdPromiseResp = function (res: Response) {
  
  return function (models: any) {
    
    models = _.flatten([models]);
    
    let status = 200; // if no model* is defined we should respond with HTTP 204/404 (?)
    
    for (let i = 0; i < models.length; i++) {
      if (models[i] !== undefined) {
        status = 200;
        try {
          delete models[i].__v;
        }
        catch (err) {
          /* noop */
        }
      }
    }
    
    res.status(status).jsonp({
      success: models
    });
  }
  
};
