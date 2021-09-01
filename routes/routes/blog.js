const router = require('express').Router();
const authController = require('../../controllers/blog');
const { auth } = require('../../middleware/auth');

router.post('/addblog', auth, authController.addBlog);
router.get('/getblogs', auth, authController.getBlogs);
module.exports = {
    router: router,
    basePath: '/'
  };