const bcrypt = require('bcrypt-nodejs');

exports.generatePassword = (nmrCharacters) => {
  const characters = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ012346789!\"#$%&\'()+,-./:;<=>?@[]^_`{|}*~/";
  let password = '';
  for(let i=0; i < nmrCharacter; i++){
    password += characters[Math.floor(Math.random() * characters.length)];
  }
  return password;
}

exports.cryptPassword = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return cb(err);
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}

exports.comparePassword = (password, cryptedHashPassword, cb) => {
  bcrypt.compare(password, cryptedHashPassword, (err, isPasswordMatch) => {   
      return err == null ? cb(null, isPasswordMatch) : cb(err);
  });
}

