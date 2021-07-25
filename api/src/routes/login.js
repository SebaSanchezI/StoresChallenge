const {Router} = require('express');
const router = Router();

const { singIn }  = require('../controllers/login.controllers.js');


//login
router.post('/',singIn);


module.exports = router;


