const router = require('express').Router();
const authController = require('../../controllers/user');

router.get('/allusers', authController.getUsers);
router.put("/updateuser/:id", authController.updateUser)
router.get("/roles", authController.getByroles)
// http://localhost:8000/roles?data=input&pageNo=1&size=10
module.exports = {
    router: router,
    basePath: '/'
  };