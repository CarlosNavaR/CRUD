/* jshint esversion: 6 */
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userId = user._id;
          res.redirect('/');
        } else {
          res.redirect('/user/login');
        }
      });
    } else {
      res.redirect('/user/login');
    }
  });
};
