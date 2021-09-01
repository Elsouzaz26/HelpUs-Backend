const router = require('express').Router();
const userController = require('../../controllers/user');
const { auth } = require('../../middleware/auth');

router.get('/allusers', auth, userController.getUsers);
router.put("/updateuser/:id", auth, userController.updateUser)
router.get("/roles",auth, userController.getByroles)
router.get("/user",auth, userController.getByname)
router.get("/userByCity",auth, userController.getByCity)
router.post("/setseniorstatus",auth, userController.updateSeniorstatus)
module.exports = {
    router: router,
    basePath: '/'
  };