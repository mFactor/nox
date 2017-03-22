import { Router } from 'express';

const base = (app, env) => {
  const router = Router();

  router.post('/log', (req, res, next) => {
    req[env.NAMESPACE].log.client(`Test log`, `info`);
    res.sendStatus(200);
    next();
  });

  app.use('/base/api', router);
};

export default base;
