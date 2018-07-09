const User = require('../schemas/User');
const Investigador = require('../schemas/Investigador');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const sequelize = require('../database/db');



User.hasOne(Investigador, {
  foreignKey: 'id_usuario',
  as: 'investigador'
})

exports.getAll = (search, cb) => {
  const where = { status: 1 };
  if(search.search.length !== 0){
    where[Op.or] = [
      {
        nombres: {
          [Op.like]: '%' + search.search + '%'
        }
      },
      {
        apellidos: {
          [Op.like]: '%' + search.search + '%'
        }
      },
      {
        codigo: search.search
      }
    ]
  }
  if(search.user_type == 1) where.id_perfil = 2;
  if(search.user_type == 2) where.id_perfil = 3;
  User
    .findAll({
      where,
      limit: parseInt(search.limit),
      offset: search.limit * (search.page - 1),
      include: [{
        model: Investigador,
        as: 'investigador'
      }]
    })
    .then((usersFound) => {
      usersFound = usersFound.map((u) => {
        if(u.dataValues.investigador){
          u.dataValues.universidad= u.dataValues.investigador.universidad;
          u.dataValues.id_pais= u.dataValues.investigador.id_pais;
          u.dataValues.id_tipo_doc= u.dataValues.investigador.id_tipo_documento;
        }
        delete u.dataValues['investigador']
        return u;
      })
      cb(null, usersFound);
    })
    .catch((err) => {
      cb(err);
    })
};

exports.get = (id,cb) => {
  User
    .findOne({
      where: { id_usuario: id },
      include: [{
        model: Investigador,
        as: 'investigador'
      }]
    })
    .then((userFound) => {
      if(!userFound) return cb({ error: 'No existe el usuario' }, 404);
      if(userFound.dataValues.investigador){
        userFound.dataValues.universidad= userFound.dataValues.investigador.universidad;
        userFound.dataValues.id_pais= userFound.dataValues.investigador.id_pais;
        userFound.dataValues.id_tipo_doc= userFound.dataValues.investigador.id_tipo_documento;
      }
      delete userFound.dataValues['investigador'];
      cb(null, 200, userFound);
    })
    .catch(err => cb(err, 500))
}

exports.register = (user, cb) => {
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  const admiMail = 'sistemaencuestas@gmail.com';
  const mailOptions = {
    to: user.email,
    from: admiMail,
    subject: 'Contraseña generada',
    text: `Usuario con codigo ${user.codigo}, su contraseña es : ${user.contraseniaNoHashed}`
  };
  delete user['contraseniaNoHashed'];
  User
    .findAll({ where: {
        [Op.or]: [
          { codigo: user.codigo },
          { email: user.email },
          { numero_doc: user.numero_doc }
        ]
      }
    })
    .then((usersFound) => {
      if(usersFound.length !== 0){
        let error = '';
        for(let i = 0; i<usersFound.length ; i++){
          if(usersFound[i].codigo == user.codigo){
            error = 'Ya existe un usuario con el mismo codigo';
            break;
          }
          if(usersFound[i].email == user.email){
            error = 'Ya existe un usuario con el mismo email';
            break;
          }
          if(usersFound[i].numero_doc == user.numero_doc){
            error = 'Ya existe un usuario con el mismo numero de documento';
            break;
          }
        }
        return cb({ error }, 409);
      }
      const options = {};
      if(user.id_perfil == 2){
        options.include = [{
          model: Investigador,
          as: 'investigador'
        }];
      }else{
        delete user['investigador']
      }
      User
        .create(user, options)
        .then((userSaved) => {
          if(userSaved.id_perfil == 2){
            userSaved.dataValues.id_tipo_documento = userSaved.dataValues.investigador.id_tipo_documento;
            userSaved.dataValues.id_pais = userSaved.dataValues.investigador.id_pais;
            userSaved.dataValues.universidad = userSaved.dataValues.investigador.universidad;
          }
          delete userSaved.dataValues['investigador'];
          return transporter.sendMail(mailOptions)
            .then(() => {
              cb(null, 200, userSaved);
            })
            .catch(err => {
              userSaved
                .destroy()
                .then(() => cb(err, 500))
                .catch((err) => cb(err, 500))
            });
        })
        .catch(err => cb(err, 500));
    })
    .catch(err => cb(err, 500));
  
}

exports.changePassword = (user, cb) => {
  User
    .findById(user.id)
    .then((userFound) => {
      if(!userFound) return cb({ err: 'No existe el usuario' }, 404);
      user.verifyPassword(user.oldpassword, userFound.dataValues.contrasenia, (err, isMatch) => {
        if(err) return cb(err, 500);
        if(!isMatch) return cb({ err: 'Contraseña equivocada' }, 401);
        userFound.contrasenia =  user.password;
        userFound
          .save()
          .then((userSaved) => {
            cb(userSaved, 200)
          })
          .catch(err => cb(err, 500));
      })
    })
    .catch(err => cb(err, 500));
}

exports.resetPassword = (user, cb) => {
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  const admiMail = 'sistemaencuestas@gmail.com';
  const mailOptions = {
    to: user.email,
    from: admiMail,
    subject: 'Contraseña reseteada',
    html: `<b>Has pedido que se genere una nueva contraseña, tu nueva contraseña es: ${user.generatedPassword}</b>`

  };
  User
    .findById(user.id)
    .then((userFound) => {
      if(!userFound) return cb({ err: 'No existe el usuario' }, 404);
      return sequelize.transaction((t) => {
        return User
          .update({ contrasenia: user.password }, {
            where: { id_usuario: user.id },
            transaction: t
          })
          .then(() => {
            return transporter.sendMail(mailOptions);
          });
      });
    })
    .then(() => {
      cb({ msg: 'Contraseña cambiada con exito' }, 200);
    })
    .catch(err => {
      cb(err, 500)
    });
};

exports.login = (user, cb) => {
  User
    .findOne({ 
      where: { email: user.username },
      include: [{
        model: Investigador,
        as: 'investigador'
      }] 
    })
    .then((userFound) => {
      if(!userFound) return cb(null, 401, { msg: 'Usuario no registrado'});
      if(userFound.id_perfil == 2){
        userFound.dataValues.id_tipo_doc = userFound.dataValues.investigador.id_tipo_doc;
        userFound.dataValues.id_pais = userFound.dataValues.investigador.id_pais;
        userFound.dataValues.universidad = userFound.dataValues.investigador.universidad;
      }
      delete userFound.dataValues['investigador'];
      cb(null, 200, userFound);
    })
    .catch(err => cb(err, 500));
}

exports.delete = (id, cb) => {
  User
    .findById(id)
    .then((userFound) => {
      if(!userFound) return cb({ err: 'No existe el usuario' }, 404);
      userFound
        .destroy()
        .then(() => cb(null, 200, { msg: 'eliminado correctamente' }))
        .catch(err => cb(err, 500))
    })
    .catch(err => cb(err, 500));
}