const User = require('../schemas/User');
const Investigador = require('../schemas/Investigador');
const probarModelo = require('../schemas/SubirModelos');
const { Op } = require('sequelize');

exports.getAll = (search, cb) => {
  const where = {};
  if(search.profile) where.id_perfil = search.profile;
  if(search.search.length !== 0){
    where.nombres = {
      [Op.like]: '%' + search.search + '%'
    };
    where.apellidos = {
      [Op.like]: '%' + search.search + '%'
    }
  }
  
  Investigador
    .findAll({
      where,
      limit: parseInt(search.limit),
      offset: search.limit * (search.page - 1),
      include: [User]
    })
    .then((usersFound) => {
      cb(null, usersFound);
    })
    .catch((err) => {
      cb(err);
    })
};

exports.register = (data, cb) => {

}

exports.login = (user, cb) => {
  User
    .find({ codigo: user.username })
    .then((usersFound) => {
      if(usersFound.length == 0){
        return cb(null, { msg: 'Usuario no registrado'});
      }
      return cb(null, { user: usersFound[0] });
    })
    .catch(err => cb(err));
}
