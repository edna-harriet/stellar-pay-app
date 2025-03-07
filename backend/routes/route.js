var express = require('express');

var studentController = require('../controllers/studentControler');
const router = express.Router();

router.route('/student/login').post(studentController.loginUserControllerFn);
router.route('/student/create').post(studentController.createStudentControllerFn);


module.exports = router;