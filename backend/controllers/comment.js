const Comment = require('../models/comment');

// Créer un Commentaire
exports.createComment = (req, res, next) => {
    Comment.create ({  
        content: req.body.content,
        userId: req.body.userId,
        publicationId: req.body.publicationId,
    })  
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

// Afficher tous les commentaires d'une publication
exports.getAllComment = (req, res, next) => {
    Comment.findAll({ where: { publicationiD: req.params.publicationId }, order: [['createdAt', 'DESC']]})
        .then((publications) => res.status(200).json(publications))
        .catch(error => res.status(400).json({ error }));
};

// Modifier un commentaire
exports.updateComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id }})
        .then(() => {
            Comment.update({ ...req.body }, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Commentaire modifié !'});
        })
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};