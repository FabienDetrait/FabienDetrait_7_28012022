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
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    
    // like: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    // usersLiked: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     get() {
    //         return this.getDataValue('usersLiked').split(';')
    //     },
    //     set(val) {
    //         this.setDataValue('usersLiked',val.join(';'));
    //     },
    // }
});

module.exports = Publication;
