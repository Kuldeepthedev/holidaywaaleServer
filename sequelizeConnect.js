const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('Hodidaywaale', 'root', null , {
  host: '127.0.0.1',
  dialect: "mysql"
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.package = require('./models/admin/package')(Sequelize,sequelize)
db.user = require('./models/user/user')(Sequelize,sequelize)

module.exports = {db}