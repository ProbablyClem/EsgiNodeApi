const express = require('express');

const ligneComptaController = require('../controllers/ligneCompta');

const router = express.Router();

// GET /compta/ligne
router.get('/lignes', ligneComptaController.getLigneCompta);

// POST /compta/ligne
router.post('/ligne', ligneComptaController.createLigneCompta);

module.exports = router;