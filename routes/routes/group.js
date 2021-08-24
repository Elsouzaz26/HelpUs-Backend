const router = require('express').Router();
const authController = require('../../controllers/group');

router.post('/addgroup', authController.addGroup);
router.get('/getgroup', authController.getGroups);
router.put('/updategroup/:id', authController.updateGroup);

module.exports = {
    router: router,
    basePath: '/'
  };
