const { Router } = require('express');
const router = Router();
const routesLogin = require('../routes/login.js')
const routesUsers = require('../routes/users.js')
const routesStores = require('../routes/stores.js')

//middlewares proteccion de rutas
const auth = require('../middlewares/auth');


 

router.use('/login',routesLogin);

router.use('/users',auth,routesUsers);

router.use('/stores',auth,routesStores);





module.exports = router;