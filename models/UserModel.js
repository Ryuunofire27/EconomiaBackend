const User = require('../schemas/User');
const Investigador = require('../schemas/Investigador');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');

exports.getAll = (search, cb) => {
  const where = { };
  if(search.search.length !== 0){
    where.nombres = {
      [Op.like]: '%' + search.search + '%'
    };
    where.apellidos = {
      [Op.like]: '%' + search.search + '%'
    }
  }
  if(search.user_type == 2){
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
    
  }else{
    User
      .findAll({
        where,
        limit: parseInt(search.limit),
        offset: search.limit * (search.page - 1)
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
  const { user, investigador } = data;
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: 'economiaEmail',
      pass: 'economia1'
    }
  });
  const admiMail = 'cdvillagomez27@gmail.com';
  const mailOptions = {
    to: admiMail,
    from: admiMail,
    subject: 'Contraseña generada',
    text: `Usuario con codigo ${user.codigo}, su contraseña es : ${user.contrasenia}`
  };
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
        cb({ error });
      }else{
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
                })
                .then(() => {
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
            return transporter.sendMail(mailOptions)
              .then(() => {
                cb(null, userSaved);
              })
              .catch(err => cb(err))
          })
          .catch(err => cb(err));
      }
    })
    .catch(err => cb(err));
  
}

exports.login = (user, cb) => {
  User
    .findOne({ where: { email: user.username } })
    .then((userFound) => {
      if(!userFound) return cb(null, { msg: 'Usuario no registrado'});
      cb(null, userFound);
    })
    .catch(err => cb(err));
}
