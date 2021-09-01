const router = require('express').Router();
const multer  = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

const authController = require('../../controllers/auth');

router.post('/signup', upload.single("img") ,authController.Signup);

router.post('/signin', authController.Signin);

router.get("/auth",authController.Verify)

module.exports = {
  router: router,
  basePath: '/'
};
