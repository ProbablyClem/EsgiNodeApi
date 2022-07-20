const express = require('express');
const { body } = require('express-validator');

const ligneComptaController = require('../controllers/ligneCompta');

const router = express.Router();

// GET /compta/ligne
//Récuperation de toutes les lignes
router.get('/lignes', ligneComptaController.getLignesCompta);

// POST /compta/ligne
//Création d'une ligne de compta
router.post('/ligne',
[
        body('date').trim().isISO8601().toDate(),
        body('montant').trim().isNumeric(),
        body('client').trim().isLength({ min: 5 })
    ],
    ligneComptaController.createLigneCompta);

router.get('/ligne/:ligneId', ligneComptaController.getLigneCompta);
module.exports = router;