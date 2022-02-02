const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Like = sequelize.define("like", { 
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    publicationId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Like;