/**
 * OPC UA client router
 * Note that this only supports one connection per session
 *
 * An extension is planned using a simple array for many connections
 */
import { EventEmitter } from 'events';
import { Router } from 'express';
import NoxClient from 'opcua/api/client/nox_client';

const clients = {};

/**
 * OPC UA Controller
 * @param {object} app - Express app object
 * @param {object} env - process.ENV ref
 * @param {object} io - Connected socketIO ref
 *
 * Note: req.sessionID is the user session from browser, NOT Ua related.
 */
const opcua = (app, env, io) => {
  const router = Router();
  /*
  router.use((req, res, next) => {
    req.resStruct = {

    };
  });
  */
  const noxIo = io.of('/opcua');

  /**
   * Initiate connect, create eventBus
   */
  router.post('/connect', async (req, res, next) => {
    let result;
    const eventBus = new EventEmitter();
    clients[req.sessionID] = new NoxClient(eventBus);

    // Connect
    result = await clients[req.sessionID].connect(req.body.endpoint);
    noxLog(result, req);

    // Get address space
    if (result.status === true) {
      result = await clients[req.sessionID].crawlDomain(req.body.endpoint);
      noxLog(result, req);
    }

    // Send result
    res.json(result);
    next();
  });

  /**
   * Disconnect
   */
  router.post('/disconnect', async (req, res, next) => {
    // Check validity
    if (!clients[req.sessionID]) {
      res.sendStatus(204);
    }

    // Disconenct
    const result = await clients[req.sessionID].disconnect(req.body.endpoint);
    delete clients[req.sessionID];
    noxLog(result, req);

    // Send result
    res.json(result);
    next();
  });

  /**
   * Browse
   */
  router.post('/browse', async (req, res, next) => {
    // Check validity
    if (!clients[req.sessionID]) {
      res.sendStatus(204);
    }

    // Browse
    const result = await clients[req.sessionID].browse(req.body.endpoint, req.body.nodeId);
    noxLog(result, req);

    // Send result
    res.json(result);
    next();
  });

  /**
   * Monitor nodes
   */
  router.post('/monitor', async (req, res, next) => {
    // Check validity
    if (!clients[req.sessionID]) {
      res.sendStatus(204);
    }

    // Check for active subscription
    let result = clients[req.sessionID].validateSubscription(req.body.endpoint,
                                                             req.body.subscriptionId);
    if (!result.status) {
      result = await clients[req.sessionID].subscribe(req.body.endpoint);
      noxLog(result, req);
    }

    if (result.status) {
      result = await clients[req.sessionID].monitor(req.body.endpoint, req.body.nodeId);
    }

    // Send result
    res.json(result);
    next();
  });

  /**
   * Unmonitor nodes
   */
  router.post('/unmonitor', async (req, res, next) => {
    // Check validity
    if (!clients[req.sessionID]) {
      res.sendStatus(204);
    }

    // Browse
    const result = await clients[req.sessionID].unmonitor(req.body.endpoint, req.body.nodeId);
    noxLog(result, req);

    // Send result
    res.json(result);
    next();
  });

  /**
   * Validate connected request
   * @param {object} req - Request to validate
   * @returns {boolean} status - Status of validated request
   */
  function validateReq(req, res) {
    // Check validity
    if (!clients[req.sessionID]) {
      res.sendStatus(204);
    }
    return req;
  }

  /**
   * Router error handler
   */
  function noxLog(result, req) {
    if (!result.status) {
      req[env.NAMESPACE].log.server('error', `${result.msg}`);
      return;
    }
    req[env.NAMESPACE].log.server('info', `${result.msg}`);
  }

  noxIo.on('connection', (socket) => {
    console.log(socket);
    /*
    socket.on('', () => {

    });
    */
  });

  // Browse node

  // Subscribe node


  app.use('/opcua/api', router);
};

export default opcua;
