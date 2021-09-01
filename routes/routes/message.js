const router = require('express').Router();
const authController = require('../../controllers/message');
const { auth } = require('../../middleware/auth');

router.get('/getmessages/:id/:skip',auth, authController.getMessages);
module.exports = {
    router: router,
    basePath: '/'
  };