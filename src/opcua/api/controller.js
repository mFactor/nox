import { Router } from 'express';

const opcua = (app, env) => {
  const router = Router();

  app.use('/opcua/api', router);
};

export default opcua;
