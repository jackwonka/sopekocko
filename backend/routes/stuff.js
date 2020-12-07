const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.post('/', auth, multer, stuffCtrl.createThing); // Envoi des données  
router.put('/:id', auth, multer, stuffCtrl.modifyThing); // Modification de l'id
router.delete('/:id', auth, stuffCtrl.deleteThing); // Suppression de l'id
router.get('/:id', auth, stuffCtrl.getOneThing); // Envoi de l'identifiant
router.get('/', auth, stuffCtrl.getAllThing); // Récupère tout les objets

module.exports = router;