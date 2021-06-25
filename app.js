'use strict';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const hbs = require('express-handlebars');
const app = express();

// Hacer uso de override en forms
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
// Cargar modulo router
const router = require('./routers/routes');

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Recursos estaticos publicos
app.use('/static', express.static('public'));

// Motor de vistas
app.engine(
  '.hbs',
  hbs({
    defaultLayout: 'index',
    extname: '.hbs',
  })
);

app.set('view engine', '.hbs');

// Hacer uso del archivo routes
app.use('/', router);

mongoose.connect(config.db, config.urlParser, (err, res) => {
  if (err) {
    return console.log(`Error al conectar en la BD ${err}`);
  }
  console.log('Conexion exitosa a la BD');

  app.listen(config.port, () => {
    console.log('Servidor corriendo en http://localhost:' + config.port);
  });
});
