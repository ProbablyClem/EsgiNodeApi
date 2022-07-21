import express from 'express';
import { body } from 'express-validator';

import ligneComptaController from '../controllers/ligneCompta.js';
import { isAuth } from '../middleware/is-auth.js'; //Middleware d'authentification
export const router = express.Router();

// GET /compta/ligne
//Récuperation de toutes les lignes
router.get('/lignes', isAuth, ligneComptaController.getLignesCompta);

// POST /compta/ligne
//Création d'une ligne de compta
router.post('/ligne',
[
        body('date').trim().isISO8601().toDate(),
        body('montant').trim().isNumeric(), 
        body('client').trim().isLength({ min: 5 })
    ], isAuth,
    ligneComptaController.createLigneCompta);

router.get('/ligne/:ligneId', ligneComptaController.getLigneCompta);

router.put(
    '/ligne/:ligneId',
    [
        body('date').trim().isISO8601().toDate(),
        body('montant').trim().isNumeric(),
        body('client').trim().isLength({ min: 5 })
    ], isAuth,
    ligneComptaController.updateLigneCompta
);


router.delete('/ligne/:ligneId', isAuth, ligneComptaController.deleteLigneCompta);