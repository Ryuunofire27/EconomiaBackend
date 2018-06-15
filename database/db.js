const Sequelize = require('sequelize');
const config = require('../config/db')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect, define: { timestamps: false }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;