const router = require('express').Router();
const groupController = require('../../controllers/group');
const { auth } = require('../../middleware/auth');

router.post('/addgroup',auth, groupController.addGroup);
router.post('/kmean',auth, groupController.kMean);
router.get('/getgroup',auth, groupController.getGroups);
router.put('/updategroup/:id',auth, groupController.updateGroup);
router.post('/getgroupByDateAndCity',auth, groupController.getGroupByCityAndDate);
router.get('/getseniorBygroup',auth, groupController.getSeniorBygroupId);
module.exports = {
    router: router,
    basePath: '/'
  };
