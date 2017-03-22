import { Log } from 'lib/log';

/**
 * Base middleware
 */
const base = (app, env) => {
  app.use((req, res, next) => {
    req[env.NAMESPACE] = {
      log: new Log(req),
    };
    next();
  });
};

export default base;
