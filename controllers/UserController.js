const um = require('../models/UserModel');
const util = require('../util/util');

exports.getAll = (req, res) => {
  const search = {
    search: req.query.search || '',
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    user_type: req.query.user
  }
  um.getAll(search, (err, users) => {
    if(err) return res.status(500).send(err);
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
    codigo: req.body.codigo,
    contrasenia: req.body.contrasenia,
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
      id_tipo_documento: req.body.tipo_doc,
      id_pais: req.body.pais,
      universidad: req.body.universidad
    };
    user.foto = req.body.foto;
    if (!req.body.foto) res.status(401).send({ err: 'El investigador requiere de una foto' })
  }else{
    user.foto = req.body.foto || '';
  }
  user.nombres = user.nombres.toUpperCase();
  user.apellidos = user.apellidos.toUpperCase();
  user.genero = user.genero.toUpperCase();
  //const generatedPassword = util.generatePassword(16);
  util.cryptPassword(/*generatedPassword*/user.contrasenia, (err, cryptedPassword) => {
    if(err) return res.status(500).send(err);
    user.contrasenia = cryptedPassword;
    um.register({ user, investigador }, (err, user) => {
      if(err) return res.status(500).send(err);
      user.contrasenia = generatedPassword;
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
    username: req.body.email,
    password: req.body.password
  };
  um.login(user, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.msg) return res.send(data);
    console.log(data.contrasenia)
    util.comparePassword(user.password, data.contrasenia, (err, isMatch) => {
      if(err) return res.status(500).send(err);
      if(isMatch) return res.send(data);
      res.send({ msg: 'Contraseña equivocada' });
    });
  });
}