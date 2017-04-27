import { Log } from 'lib/log';

/**
 * Base middleware
 */
const base = (app, env) => {
  app.use((req, res, next) => {
    req[env.NAMESPACE] = {
      log: new Log(req),
      base: {
        drawer: {
          collapsed: true,
        },
      },
      sitemap: [],
    };
    next();
  });
};

export default base;
