const passwordValidator = require("password-validator");    // Importer password-validator
const passwordSchema = new passwordValidator(); // Créer un schéma

// Ajouter les propriétés
passwordSchema
    .is().min(8)                                    // Longueur min 8
    .is().max(100)                                  // Longueur max 100
    .has().uppercase()                              // Doit contenir au moins une majuscule
    .has().lowercase()                              // Doit contenir au moins une minuscule
    .has().digits()                                 // Doit contenir au moins 1 nombre
    .has().not().spaces()                           // Ne doit pas contenir d'espaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Passwords interdits

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({  message: "Le mot de passe doit contenir au moins 8 caractères, un chiffre, une minuscule, une majuscule et pas d'espace" });
    } else {
        next();
    }
}