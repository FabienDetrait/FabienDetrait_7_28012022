const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Comment = sequelize.define("comment", { 
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    publicationId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Comment;

