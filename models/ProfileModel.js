const Profile = require('../schemas/Profile');

exports.getAll = (cb) => {
  Profile
    .findAll()
    .then((profilesFound) => {
      cb(null, profilesFound);
    })
    .catch(err => cb(err));
};

exports.insert = (profile, cb) => {
  const newProfile = Profile.build(profile);
  newProfile
    .save()
    .then((profileSaved) => cb(profileSaved))
    .catch(err => cb(err));
}

exports.delete = (id, cb) => {
  Profile
    .findById(id)
    .then((profileFound) => {
      return profileFound.destroy();
    })
    .then((count) => {
      console.log(count);
      cb(null);
    })
    .catch(err => cb(err));
}