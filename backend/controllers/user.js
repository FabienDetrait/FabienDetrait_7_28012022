const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// S'enregistrer
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                admin: false,
            })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ errormessage: 'Utilisateur existe déjà' }));
         })
        .catch(error => res.status(500).json({ error }));
};

// Se connecter
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email }})
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: "24h" }
            )
          }); 
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Afficher un utilisateur
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id }})
    .then((user) => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer un compte
exports.deleteUser = (req, res, next) => {
  User.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Compte supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

// Modifier un email
exports.modifyEmail = (req, res, next) => {
  User.update({ email: req.body.email }, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Email modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


