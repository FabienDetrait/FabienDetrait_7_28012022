const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Publication = sequelize.define("publication", { 
    title :{
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Publication;
