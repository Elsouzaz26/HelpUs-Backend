const router = require('express').Router();
const distributionController = require('../../controllers/distribution');
const { auth } = require('../../middleware/auth');

router.post('/saveDistributions', auth, distributionController.saveDistribution);
router.get('/getDistributions', auth, distributionController.getDistribution);
router.post('/renewDistributions', auth, distributionController.renewDistribution);



module.exports = {
    router: router,
    basePath: '/'
  };