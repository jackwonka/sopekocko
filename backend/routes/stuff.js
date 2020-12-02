const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.post('/', stuffCtrl.createThing); // Envoi des données  
router.put('/:id', stuffCtrl.modifyThing); // Modification de l'id
router.delete('/:id', stuffCtrl.deleteThing); // Suppression de l'id
router.get('/:id', stuffCtrl.getOneThing); // Envoi de l'identifiant
router.get('/', stuffCtrl.getAllThing); // Récupère tout les objets

module.exports = router;