
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

// Permet d'authentifier les pages de l'application
const auth = require('../middleware/auth');

// middleware qui définit la destination et le nom de fichier des images
const multer = require('../middleware/multer-config');

// La logique routes dispnibles dans notre application
router.post('/', auth, multer, sauceCtrl.createSauce);// Envoi des données
router.put('/:id', auth, multer, sauceCtrl.modifySauce);// Modification de l'id
router.delete('/:id', auth, sauceCtrl.deleteSauce);// Suppression de l'id
router.get('/', auth, sauceCtrl.getAllSauces);// Récupère tout les objets
router.get('/:id', auth, sauceCtrl.getOneSauce);// Envoi de l'identifiant
router.post('/:id/like', auth, sauceCtrl.likeSauce); // like / dislike les sauces

module.exports = router;