import NoxClient from 'opcua/api/client/nox_client';

/**
 * OPC UA middleware
 */
const opcua = (app, env) => {
  // const client = new NoxClient();
  app.use((req, res, next) => {
    /*
    if (req.originalUrl === '/') {
      (async function uaTest() {
        const ep = 'opc.tcp://mfactorengineering.com:4840';
        await client.connect(ep);
        await client.crawlDomain(ep);
        await client.disconnect(ep);
      }());
    }
    */
    next();
  });
};

export default opcua;
