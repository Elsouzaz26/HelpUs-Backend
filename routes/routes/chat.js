const router = require('express').Router();
const authController = require('../../controllers/chat');
const { auth } = require('../../middleware/auth');

router.get('/getchats', auth, authController.getChats);
module.exports = {
    router: router,
    basePath: '/'
  };