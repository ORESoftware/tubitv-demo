'use strict';

import * as express from 'express';
import {ErrorRequestHandler, NextFunction, Request, RequestHandler, Response} from 'express';
import * as watchableRouter from './routes/watchable';
import * as userRouter from './routes/user';
import * as contentQueueRouter from './routes/content-queue';
import bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));


app.use((req: any, res, next) => {
  
  try {
    // this parses all requests that the CDT API server receives
    req.parsedFilterParam = JSON.parse(req.query.filter || req.query.all || '{}');
    req.parsedQueryOpts = JSON.parse(req.query.info || '{}');
  }
  catch (err) {
    return next(err);
  }
  
  next();
  
});

app.use('/rest/user', watchableRouter.router);
app.use('/rest/watchable', userRouter.router);
app.use('/rest/contentqueue', contentQueueRouter.router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  
  res.json({
    success: false,
    error: err
  });
  
});

export {app};
