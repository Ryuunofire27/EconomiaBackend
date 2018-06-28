const bcrypt = require('bcrypt-nodejs');

const generatePassword = (nmrCharacters) => {
  const characters = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ012346789!\"#$%&\'()+,-./:;<=>?@[]^_`{|}*~/";
  let password = '';
  for(let i=0; i < nmrCharacters; i++){
    password += characters[Math.floor(Math.random() * characters.length)];
  }
  return password;
}

const cryptPassword = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return cb(err);
    bcrypt.hash(password, salt, null, (err, hash) => {
      return cb(err, hash);
    });
  });
}

exports.comparePassword = (password, cryptedHashPassword, cb) => {
  bcrypt.compare(password, cryptedHashPassword, (err, isPasswordMatch) => {   
      return err == null ? cb(null, isPasswordMatch) : cb(err);
  });
}

exports.generatePassword = generatePassword;
exports.cryptPassword = cryptPassword;