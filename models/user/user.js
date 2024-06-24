const { Sequelize, sequelize } = require('../../sequelizeConnect');

module.exports = (Sequelize, sequelize) => {
    const User = sequelize.define('User', {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        OTP: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.JSON // Assuming avatar is stored as JSONB in PostgreSQL
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return User;
};
