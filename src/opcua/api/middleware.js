/**
 * OPC UA middleware
 */

const opcua = (app, env) => {
  app.use((req, res, next) => {
    req[env.NAMESPACE].opcua = {
    };
    next();
  });
};

export default opcua;
