const router = require('express').Router();
const authController = require('../../controllers/auth');

router.post('/signup', authController.Signup);

router.post('/signin', authController.Signin);


module.exports = {
  router: router,
  basePath: '/'
};
