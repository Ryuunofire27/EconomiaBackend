const um = require('../models/UserModel');
const util = require('../util/util');

exports.getAll = (req, res) => {
  const search = {
    search: req.query.search || '',
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    user_type: req.query.type
  }
  search.limit = parseInt(search.limit);
  search.page = parseInt(search.page);
  um.getAll(search, (err, users) => {
    if(err) return res.status(500).send(err);
    res.send(users);
  });
}

exports.get = (req, res) => {
  const id = req.params.id;
  um.get(id, (err, status, user) => {
    if(err) return res.status(status).send(err);
    res.status(status).send(user);
  });
}

exports.getEncuestasByUser = (req, res) => {
  const filters = {
    id: req.params.id,
    limit: req.query.limit || 10,
    page: req.query.page || 1
  }
  filters.limit = parseInt(filters.limit);
  filters.page = parseInt(filters.page);
  um.getEncuestasByUser(filters, (data, status) => {
    res.status(status).send(data);
  });
}

exports.register = (req, res) => {
  const user = {
    codigo: req.body.codigo,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    telefono: req.body.telefono,
    celular: req.body.celular,
    numero_doc: req.body.numero_doc,
    email: req.body.email,
    genero: req.body.genero,
    id_perfil: req.body.id_perfil,
    foto: req.files && req.files.foto || '' ,
    investigador: {
      id_tipo_documento: req.body.id_tipo_doc,
      id_pais: req.body.id_pais,
      universidad: req.body.universidad
    }
  }
  if(user.id_perfil == 2){
    if (!user.foto || user.foto == '') res.status(400).send({ err: 'El investigador requiere de una foto' })
  }
  
  user.nombres = user.nombres.toUpperCase();
  user.apellidos = user.apellidos.toUpperCase();
  user.genero = user.genero.toUpperCase();
  const generatedPassword = util.generatePassword(16);
  user.contraseniaNoHashed = generatedPassword;
  util.cryptPassword(generatedPassword, (err, cryptedPassword) => {
    if(err) return res.status(500).send(err);
    user.contrasenia = cryptedPassword;
    um.register(user, (data, status) => {
      return res.status(status).send(data);
    });
  });
}

exports.changePassword = (req, res) => {
  const user = {
    id: req.params.id,
    oldpassword: req.body.oldpassword,
    password: req.body.password,
    repassword: req.body.repassword,
    verifyPassword: util.comparePassword
  };
  if(!user.oldpassword || user.oldpassword == "") return res.status(400).send({ err: 'Falta enviar datos' });
  if(user.password != user.repassword) return res.status(401).send({ msg: 'Las contraseñas no concuerdan' });
  util.cryptPassword(user.password, (err, cryptedPassword) => {
    if(err) return res.status(500).send(err);
    user.password = cryptedPassword;
    um.changePassword(user, (data, status) => {
      res.status(status).send(data);
    });
  });
}

exports.resetPassword = (req, res) => {
  const user =  { id: req.params.id, email: req.body.email };
  if(!user.email || user.email == '') return res.status(400).send({ err: 'Falta enviar el correo' });
  const generatedPassword = util.generatePassword(16);
  util.cryptPassword(generatedPassword, (err, cryptedPassword) => {
    if(err) return res.status(500).send(err);
    user.password = cryptedPassword;
    user.generatedPassword = generatedPassword;
    um.resetPassword(user, (data, status) => {
      res.status(status).send(data);
    });
  });
}

exports.login = (req, res) => {
  const user = {
    username: req.body.email,
    password: req.body.password
  };
  um.login(user, (err, status = 200, data) => {
    if (err) return res.status(status).send(err);
    if (data.msg) return res.status(status).send(data);
    util.comparePassword(user.password, data.contrasenia, (err, isMatch) => {
      if(err) return res.status(status).send(err);
      if(isMatch) return res.status(status).send(data);
      res.status(401).send({ msg: 'Contraseña equivocada' });
    });
  });
}

exports.delete = (req, res) => {
  um.delete(req.params.id, (err, status, data) => {
    if(err) return res.status(status).send(err);
    res.status(status).send(data);
  });
}