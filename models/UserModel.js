const User = require('../schemas/User');
const Investigador = require('../schemas/Investigador');
const probarModelo = require('../schemas/SubirModelos');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');

exports.getAll = (search, cb) => {
  const where = { id_perfil: search.user_type };
  if(search.search.length !== 0){
    where.nombres = {
      [Op.like]: '%' + search.search + '%'
    };
    where.apellidos = {
      [Op.like]: '%' + search.search + '%'
    }
  }
  if(search.user_type === 1){
    User
      .findAll({
        where,
        limit: parseInt(search.limit),
        offset: search.limit * (search.page - 1)
      })
      .then((usersFound) => {
        console.log(usersFound);
        cb(null, usersFound);
      })
      .catch((err) => {
        cb(err);
      })
  }else{
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
  }
};

exports.get = (data,cb) => {
    let error;
    User.findById(data).then(objeto => {
      if(objeto!=null){
        console.log("Se ha encontrado la zona " + objeto.nombres);
      }else{
        error = "ERROR : La zona buscada no existe.";
      }
      cb(error, objeto);
    });
}

exports.register = (data, cb) => {
  /*const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  const admiMail = 'cdvillagomez27@gmail.com';
  const mailOptions = {
    to: admiMail,
    from: admiMail,
    subject: 'Activar cuenta Startruck',
    text: `
    El usuario ${user.rucData.ruc.split(' - ')[1]} con ruc ${user.ruc} acaba de registrarse y requiere activacion`
  };*/
  const { user, investigador } = data;
  console.log(user);
  console.log(investigador);
  const newUser = new User(user);
  newUser
    .save()
    .then((userSaved) => {
      if(userSaved.id_perfil == 2){
        investigador.id_usuario = userSaved.id_usuario;
        const newInvestigador = new Investigador(investigador);
        return newInvestigador
          .save()
          .then((investigadorSaved) => {
            userSaved.investigador = investigadorSaved;
            cb(null, userSaved);
          })
          .catch(err => {
            userSaved
              .destroy()
              .then(() => {
                cb(err)
              });
          });
      }
      cb(null, userSaved);
    })
    .catch(err => cb(err));
}

exports.login = (user, cb) => {
  User
    .findOne({ where: { codigo: user.username } })
    .then((userFound) => {
      console.log(userFound);
      if(!userFound) return cb(null, { msg: 'Usuario no registrado'});
      cb(null, userFound);
    })
    .catch(err => cb(err));
}
