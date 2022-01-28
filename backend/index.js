const sequelize = require('./utils/database');

const User = require('./models/user');
const Publication = require('./models/publication');
const Comment = require('./models/comment');

// Relation entre User et Publication
User.hasMany(Publication);
Publication.belongsTo(User);

// Relation entre User et Comment
User.hasMany(Comment);
Comment.belongsTo(User);

// Relation entre Publication et Comment
Publication.hasMany(Comment);
Comment.belongsTo(Publication);

// Suppression User => Suppression de ses Publications
User.hasMany(Publication, { onDelete: 'CASCADE'});
Publication.belongsTo(User, { onDelete: 'CASCADE'});

// Suppression User => Suppression de ses Comment
User.hasMany(Comment, { onDelete: 'CASCADE'});
Comment.belongsTo(User, { onDelete: 'CASCADE'});

// Suppression Publication => Suppression de ses Comment
Publication.hasMany(Comment, { onDelete: 'CASCADE'});
Comment.belongsTo(Publication, { onDelete: 'CASCADE'});

sequelize.sync({ alter: true })
    .then(result => {
        console.log("Synchronisation BDD réussie !");
    })
    .catch(error => {
        console.log("Synchronisation BDD échouée !");
    });

