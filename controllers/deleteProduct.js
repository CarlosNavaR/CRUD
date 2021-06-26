/* jshint esversion: 6 */

const product = require('../models/product');

module.exports = (req, res) => {
  let DatoBusqueda = req.params.ProductID;

  product.findById(DatoBusqueda, (err, ProductID) => {
    if (err)
      return res.status(500).send({
        message: `Error al eliminar el producto ${err}`,
      });

    ProductID.remove((err) => {
      if (err)
        return res.status(500).send({
          message: `Error al eliminar el producto ${err}`,
        });
      //res.status(200).send({ message: 'Producto eliminado correctamente' });
      res.redirect('/api/product');
    });
  });
};
