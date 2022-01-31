const Publication = require('../models/publication');
const fs = require("fs");

// Créer une publication
exports.createPublication = (req, res, next) => {
    Publication.create ({  
        title: req.body.title,  
        content: req.body.content,
        image: req.file ? `${ req.protocol }://${ req.get("host") }/images/${ req.file.filename }` : null,
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

// Modifier une publication
exports.updatePublication = (req, res, next) => {
    Publication.findOne({ where: { id: req.params.id }})
        .then(publication => {
            if (publication.image != null) {
                const filename = publication.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {});
                publication.title = req.body.title;
                publication.content = req.body.content;
                publication.image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
                publication.save();
            }
            else {
                publication.title = req.body.title;
                publication.content = req.body.content;
                publication.image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
                publication.save();
            }
        })
        .then(() => res.status(200).json({ message: 'Publication mise à jour !'}))
        .catch(error => res.status(500).json({ error }));
};

// Supprimer une publication
exports.deletePublication = (req, res, next) => {
    Publication.findOne({ where: { id: req.params.id }})
        .then(publication => {
            if (publication.image != null) {
                const filename = publication.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Publication.destroy({ where: { id: req.params.id }})
                        .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
                        .catch(error => res.status(400).json({ error }));
                });
            }
            else {
                Publication.destroy({ where: { id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
                    .catch(error => res.status(400).json({ error })); 
            }
        })
        .catch(error => res.status(500).json({ error }));
};