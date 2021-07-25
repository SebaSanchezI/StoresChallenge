const {Router} = require('express');
const router = Router();
const {getAllUsers, postUser,getUser, putUser,deleteUser } = require('../controllers/users.controllers');

//recuperar todos los usuarios
router.get('/',getAllUsers);

//cuando registran un usuario
router.post('/',postUser);

//recuperar un user para actualizar
router.get('/:id',getUser);

//cuando actualizan un usuario
router.put('/',putUser);

//cuando eliminan un usuario
router.delete('/:id',deleteUser);

module.exports = router;