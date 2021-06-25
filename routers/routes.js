/* jshint esversion: 6 */

//Importar modulos
const express = require('express');
const Product = require('../models/product');
const path = require('path');

// Crear objeto de router
const router = express.Router();

//Exportar nuestro router
module.exports = router;

// Pagina home
router.get('/', (req, res) => {
  res.status(200).render('home');
});

// Pagina de productos
router.get('/AddProduct', (req, res) => {
  res.status(200).render('product');
});

// Consulta todos los datos
router.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la peticion ${err}`,
      });

    if (!products)
      return res.status(404).send({
        message: 'No existen los productos',
      });

    //res.status(200).send({ products,});
    res.render('products', {
      products,
    });
  }).lean();
});

// Consulta por filtro - Nava Reyes Carlos
router.get('/api/product/:datoBusqueda', (req, res) => {
  let datoBusqueda = req.params.datoBusqueda;
  Product.findById(datoBusqueda, (err, products) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la peticion ${err}`,
      });

    if (!products)
      return res.status(404).send({
        message: 'El producto no existe',
      });

    //res.status(200).send({ product: products });
    res.render('productEdit', {
      product: products,
    });
  }).lean();
});
// Registro de datos
router.post('/api/product', (req, res) => {
  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.avatar;
  product.price = req.body.price;
  product.category = req.body.category.toLowerCase();
  product.description = req.body.description;

  console.log(req.body);

  product.save((err, productStored) => {
    if (err)
      return res.status(500).send({
        message: `Èrror al realizar la petición ${err}`,
      });

    res.redirect('/api/product');
  });
});

// Modificación de datos (put)
const putProduct = require('../controllers/putProduct');
router.put('/api/product/:ProductID', putProduct);

// Eliminacion de un producto(delete)
const deleteProduct = require('../controllers/deleteProduct');
router.delete('/api/product/:ProductID', deleteProduct);

router.get('/user/register', (req, res) => {
  res.render('Register');
});

// Autentificacion de usuario
const newUserController = require('../controllers/storeUser');
router.post('/auth/register', newUserController);

//pagina  404 not found
router.use((req, res) => {
  res.status(404).render('notfound');
});
