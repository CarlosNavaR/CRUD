/* jshint esversion: 6 */

//Importar modulos
const express = require('express');
const Product = require('../models/product');
const path = require('path');
const expressSession = require('express-session');
const authMidd = require('../middleware/authMiddleware');
const redirectIfAuth = require('../middleware/redirectAuth');
// Crear objeto de router
const router = express.Router();

//Exportar nuestro router
module.exports = router;

// Guardar cookies
router.use(
  expressSession({
    secret: 'IttGalgos',
    resave: true,
    saveUninitialized: true,
  })
);

// Variables globales
router.use((req, res, next) => {
  res.locals.loggedIn = req.session.userId || null;
  next();
});
// Pagina home
router.get('/', (req, res) => {
  res.render('home');
});

// Pagina de productos
router.get('/api/NewProduct', authMidd, (req, res) => {
  res.render('product');
});

// Consulta todos los datos
router.get('/api/product', authMidd, (req, res) => {
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
router.get('/api/product/:datoBusqueda', authMidd, (req, res) => {
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
const newProduct = require('../controllers/newProduct');
router.post('/api/product', authMidd, newProduct);

// Modificación de datos (put)
const putProduct = require('../controllers/putProduct');
router.put('/api/product/:ProductID', authMidd, putProduct);

// Eliminacion de un producto(delete)
const deleteProduct = require('../controllers/deleteProduct');
router.delete('/api/product/:ProductID', authMidd, deleteProduct);

const registerController = require('../controllers/register');
router.get('/user/register', redirectIfAuth, registerController);

// Registro de usuario
const newUserController = require('../controllers/storeUser');
router.post('/auth/register', redirectIfAuth, newUserController);

// Muestra formulario de login
const loginController = require('../controllers/login');
router.get('/user/login', redirectIfAuth, loginController);

// Autentificacion de inicio de sesion
const authLoginUser = require('../controllers/authLogin');
router.post('/auth/login', redirectIfAuth, authLoginUser);

const LogOutController = require('../controllers/logOut');
router.get('/auth/logOut', authMidd, LogOutController);

//pagina  404 not found
router.use((req, res) => {
  res.status(404).render('notfound');
});
