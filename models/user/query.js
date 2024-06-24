const { Sequelize, sequelize } = require('../../sequelizeConnect');

module.exports = (Sequelize, sequelize) => {
    const query = sequelize.define('User', {
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        PhoneNumber: {
            type: Sequelize.STRING
        },
        Name: {
            type: Sequelize.STRING
        },
        City: {
            type: Sequelize.STRING
        },
        Destination: {
            type: Sequelize.STRING // Assuming avatar is stored as JSONB in PostgreSQL
        },
        travllers: {
            type: Sequelize.STRING // Assuming avatar is stored as JSONB in PostgreSQL
        },
        Budget: {
            type: Sequelize.STRING // Assuming avatar is stored as JSONB in PostgreSQL
        },
        category: {
            type: Sequelize.STRING // Assuming avatar is stored as JSONB in PostgreSQL
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

    return query;
};
