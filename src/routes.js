const express = require('express');
const librosController = require('./controllers/libros.controller');
const clientesController = require('./controllers/clientes.controller');
const router = express.Router();

// Rutas
router.get('/libros', librosController.findAll);
router.get('/libros/:isbn', librosController.findOne);
router.post('/libros', librosController.create);
router.put('/libros/:isbn', librosController.update);
router.delete('/libros/:isbn', librosController.delete);

router.get('/clientes', clientesController.findAll);
router.get('/clientes/:id', clientesController.findOne);
router.post('/clientes', clientesController.create);
router.put('/clientes/:id', clientesController.update);
router.delete('/clientes/:id', clientesController.delete);

module.exports = router;