const User = require('../schemas/User');

exports.getAll = (user, cb) => {
  User
    .findAll()
    .then((userFounds) => {
      cb(null, userFounds);
    })
    .catch((err) => {
      cb(err);
    })
};
