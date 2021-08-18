const router = require('express').Router();
const authController = require('../../controllers/user');

router.get('/allusers', authController.getUsers);
router.put("/updateuser/:id", authController.updateUser)

module.exports = {
    router: router,
    basePath: '/'
  };