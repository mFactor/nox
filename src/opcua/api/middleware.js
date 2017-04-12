/**
 * OPC UA middleware
 * Set up a default server for connection
 */
const opcua = (app, env) => {
  app.use((req, res, next) => {
    req[env.NAMESPACE].opcua = {
      'opc.tcp://mfactorengineering.com:4840': {
        isConnected: false,
        isActive: true,
        addressSpace: null,
        browseResult: {},
        subscriptions:{},
        msg: null,
      },
    };
    next();
  });
};

export default opcua;
