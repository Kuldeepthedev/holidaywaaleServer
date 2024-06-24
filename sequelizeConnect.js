const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.package = require('./models/admin/package')(Sequelize,sequelize)
db.user = require('./models/user/user')(Sequelize,sequelize)
db.query = require('./models/user/query')(Sequelize,sequelize)
module.exports = db;
