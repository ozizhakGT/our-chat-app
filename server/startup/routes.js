const express = require('express');
const router = express.Router();
const health = require('../routes/health');

module.exports = app => {
  app.use(express.json());

  router.use('/health', health);

  app.use('/api', router);
}
