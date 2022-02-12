// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); //renderiza o muestra el formulario para el usuario
router.post('/', productsController.store); //Recibe los datos del formulario para cargarlos dentro de la base de datos


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy);


module.exports = router;
