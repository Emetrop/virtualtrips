import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';

import location from '../../services/location';

const route = Router();

// no business logic here, just passing received data to services

export default (app: Router) => {
  app.use(route);

  // route.get('/location' ...

  route.get('/locations',
    celebrate({
      query: Joi.object({
        q: Joi.string().min(2).required(),
      }),
    }), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const locationService = location(req.app.get('db'));
      const results = await locationService.getLocationsByNameSearch(req.query.q);
      return res.json(results).status(200);
    } catch (e) {
      console.log('error: ', e);
      return next(e);
    }
  });
};
