const Publication = require('../models/publication');
const fs = require("fs");

// Créer une publication
exports.createPublication = (req, res, next) => {
    Publication.create ({  
        title: req.body.title,  
        content: req.body.content,
        image: `${ req.protocol }://${ req.get("host") }/images/${ req.file.filename }`,
        userId: req.body.userId,
    })  
        .then(() => res.status(201).json({ message: 'Publication enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};

// Afficher toutes les publications
exports.getAllPublication = (req, res, next) => {
    Publication.findAll({ order: [['createdAt', 'DESC']]})
        .then((publications) => res.status(200).json(publications))
        .catch(error => res.status(400).json({ error }));
};

// Afficher une publication
exports.getOnePublication = (req, res, next) => {
    Publication.findOne({ where: { id: req.params.id }})
        .then((publication) => res.status(200).json(publication))
        .catch(error => res.status(400).json({ error }));
};



// Supprimer une publication
exports.deletePublication = (req, res, next) => {
    Publication.findOne({ where: { id: req.params.id }})
        .then(publication => {
            const filename = publication.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Publication.destroy({ where: { id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};