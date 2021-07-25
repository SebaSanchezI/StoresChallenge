const {Router} = require('express');
const router = Router();

const { getStores, getUsers,getStats}  = require('../controllers/stores.controllers');

//cuando ingresan al home muestra todas las tiendas
router.get('/',getStores);

//muestra todos los usuarios de una tienda
router.get('/:id',getUsers);

//cuando solicitan estadisticas
router.get('/stats/:id',getStats);


module.exports = router;