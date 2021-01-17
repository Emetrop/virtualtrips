import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from '../api';
import config from '../config';

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(bodyParser.json());

  // Load API routes
  app.use(config.apiPrefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
