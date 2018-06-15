const um = require('../models/UserModel');
const util = require('../util/util');

exports.getAll = (req, res) => {
  const search = {
    search: req.query.search || '',
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    profile: req.query.profile 
  }
  um.getAll(search, (err, users) => {
    if(err) return res.status(500).send({ err: 'Error en la peticion' });
    res.send(users);
  });
}

exports.get = (req, res) => {
  const id = req.params.id;
  um.get(id, (err, user) => {
    if(err) return res.status(500).send({ err: 'Error en la peticion' });
    res.send(user);
  });
}

exports.register = (req, res) => {
  const user = {
    id_usuario: req.body.id_usuario,
    codigo: req.body.codigo,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    telefono: req.body.telefono,
    celular: req.body.celular,
    numero_doc: req.body.numero_doc,
    email: req.body.email,
    genero: req.body.genero,
    id_perfil: req.body.id_perfil,
  }
  let investigador = null;
  if(user.id_perfil == 2){
    investigador = {
      tipo_doc: req.body.tipo_doc,
      codigo_sunedu: req.body.codigo_sunedu,
      nacionalidad: req.body.nacionalidad,
      universidad: req.body.universidad,
    };
    if(!req.files.foto) return res.status(401).send({ err: 'Es necesario la foto del investigador' });
    user.foto = req.files.foto;
  }else{
    user.foto = req.files && req.files.foto || 'default';
  }
  user.nombres = user.nombres.toUpperCase();
  user.apellidos = user.apellidos.toUpperCase();
  user.genero = user.genero.toUpperCase();
  util.cryptPassword(util.generatePassword(16), (err, cryptedPassword) => {
    user.password = cryptedPassword;
    um.register({ usuario, investigador }, (err, user) => {
      if(err) return res.status(500).send(err);
      res.send(user);
    });
  });
}

exports.changePassword = (req, res) => {
  const user = {
    oldpassword: req.body.oldpassword,
    password: req.body.password,
    repassword: req.body.password
  };
  if(user.password != user.repassword) return res.status(401).send({ msg: 'Las contraseñas no concuerdan' });
  um.changePassword(user, (err, data) => {
    if(err) return res.status(500).send(err);
    res.send(data);
  });
}

exports.login = (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  um.login(user, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data.user) return res.send(data);
    util.comparePassword(user.password, data.user.contrasenia, (err, isMatch) => {
      if(err) return res.status(500).send(err);
      if(isMatch) return res.send(data.user);
      res.send({ msg: 'Contraseña equivocada' })
    });
  });
}