/* jshint esversion: 6 */

const product = require('../models/product');

module.exports = (req, res) => {
  let ProductID = req.params.ProductID;
  let update = req.body;

  product.findByIdAndUpdate(ProductID, update, (err, product) => {
    if (err)
      return res.status(500).send({
        message: `Error al actualizar el producto ${err}`,
      });

    if (!product)
      return res.status(404).send({
        message: 'El producto no existe',
      });
    console.log(product);
    //res.status(200).send({ product: product });
    res.redirect('/api/product');
  });
};
