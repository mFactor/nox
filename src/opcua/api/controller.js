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
const opcua = (app, env, io) => {
  const router = Router();
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
    handleErr(result, req, res, next);
    req[env.NAMESPACE].log.server('info', `${result.msg}`);

    // Get address space
    result = await clients[req.sessionID].crawlDomain(req.body.endpoint);
    handleErr(result, req, res, next);
    req[env.NAMESPACE].log.server('info', `${result.msg}`);

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
    handleErr(result, req, res, next);
    req[env.NAMESPACE].log.server('info', `Disconnected from ${req.body.endpoint}`);

    // Send result
    res.json(result);
    next();
  });

  /**
   * Router error handler
   */
  function handleErr(result, req, res, next) {
    if (!result.status) {
      req[env.NAMESPACE].log.server('error', `${result.msg}`);
      res.sendStatus(500);
      next();
    }
  }

  noxIo.on('connection', (socket) => {
    console.log(socket.id);
  });

  // Browse node

  // Subscribe node


  app.use('/opcua/api', router);
};

export default opcua;
