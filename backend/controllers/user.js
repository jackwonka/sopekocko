const bcrypt = require('bcrypt'); // Chiffrement
const User = require('../models/user'); 
const jwt = require('jsonwebtoken'); // Token generateur vérifie la requête authentifiée
const emailValidator = require('email-validator');// Email validator package
const passwordValidator = require('password-validator'); // Password validator package
const MaskData = require('maskdata'); // Masquage des données 

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(6) // Longueur minimum 6
.is().max(30) // Longueur maximale 30
.has().uppercase() // Doit avoir des lettres majuscules
.has().lowercase() // Doit avoir des lettres minuscules
.has().digits() // Doit avoir au moins 1 chiffre
.has().not().symbols(); // Pas de symboles

// Fonction créer l'utilisateur et sauvegarde 
exports.signup = (req, res, next) => { // Inscription du user
if (!emailValidator.validate(req.body.email) || !passwordSchema.validate(req.body.password)) { // Si l'email et mot de passe ne sont pas valides
  return res.status(400).json({ message: `Votre email ou mot de passe n'est pas valide veuillez vérifier à nouveau, votre mot de passe doit contenir 6 caractères, une majuscule, une minuscule minimum, et des chiffres`});
  
} else if (emailValidator.validate(req.body.email) || passwordSchema.validate(req.body.password)) { // Si valide
    const maskedMail = MaskData.maskEmail2(req.body.email); // Masquage de adresse mail
    bcrypt.hash(req.body.password, 10) // bcrypt hash mot de passe
    .then( hash => {
      
        const user = new User ({ // Créé nouveau utilisateur
            email: maskedMail, // Adresse mail masquée 
            password: hash // Hash sauvegardé dans la base de données
        });
        user.save() // Mongoose stocke dans la base de données
        .then( hash => res.status(201).json({ message: 'Utilisateur créé!'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
  };

}

exports.login = (req, res, next) => { // Connexion de l'utilisateur
  const maskedMail = MaskData.maskEmail2(req.body.email);
    User.findOne({ email: maskedMail }) // Vérifie que l'adresse mail figure bien dan la base de données
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // Compare les mots de passes
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({ 
              userId: user._id,
              token: jwt.sign( // Génère un token de session pour l'utilisateur maintenant connecté
                  { userId: user._id},
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h'}
              )
              
            })
            
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };