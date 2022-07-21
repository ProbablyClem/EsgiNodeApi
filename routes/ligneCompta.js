import express from 'express';
import { body } from 'express-validator';

import ligneComptaController from '../controllers/ligneCompta.js';
import { isAuth } from '../middleware/is-auth.js'; //Middleware d'authentification
export const router = express.Router();

/**
 * GET /compta/lignes
 * @summary Liste des lignes comptable
 * @security ApiKeyAuth
 * @tags Compta
 * @param {number} page.query - numéro de la page a consulter (2 par 2)
 * @return {ListeLigneCompta} 200 - Succes - application/json
 */
router.get('/lignes', isAuth, ligneComptaController.getLignesCompta);

/**
 * POST /compta/ligne
 * @summary Création d'une ligne comptable
 * @security ApiKeyAuth
 * @tags Compta
 * @param {string} date.form.required - Date de création - multipart/form-data
 * @param {number} montant.form.required - Montant - multipart/form-data
 * @param {string} client.form.required - Client - multipart/form-data
 * @param {file} facture.form.required - Fichier de la facture - multipart/form-data
 * @return {RetourLigneCompta} 200 - Succes - application/json
 */
router.post('/ligne',
[
        body('date').trim().isISO8601().toDate(),
        body('montant').trim().isNumeric(), 
        body('client').trim().isLength({ min: 5 })
    ], isAuth,
    ligneComptaController.createLigneCompta);

/**
* GET /compta/ligne/{id}
* @summary Recupération d'une ligne comptable par id
* @security ApiKeyAuth
* @tags Compta
* @param {number} id.path - Identifiant de la ligne
* @return {RetourLigneCompta} 200 - Succes - application/json
*/
router.get('/ligne/:ligneId', ligneComptaController.getLigneCompta);

/**
* PUT /compta/ligne/{id}
* @summary Modification d'une ligne comptable par id
* @security ApiKeyAuth
* @tags Compta
* @param {number} id.path - Identifiant de la ligne
* @return {RetourLigneCompta} 200 - Succes - application/json
*/
router.put(
    '/ligne/:ligneId',
    [
        body('date').trim().isISO8601().toDate(),
        body('montant').trim().isNumeric(),
        body('client').trim().isLength({ min: 5 })
    ], isAuth,
    ligneComptaController.updateLigneCompta
);

/**
 * Message type
 * @typedef {object} Message
 * @property {string} message.required - Date de la ligne
 */

/**
* DELETE /compta/ligne/{id}
* @summary Suppression d'une ligne comptable par id
* @security ApiKeyAuth
* @tags Compta
* @param {number} id.path - Identifiant de la ligne
* @return {Message} 200 - Succes - application/json
*/
router.delete('/ligne/:ligneId', isAuth, ligneComptaController.deleteLigneCompta);