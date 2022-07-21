
import express from 'express';
import { body } from 'express-validator';

import User from '../models/user.js';
import authController from '../controllers/auth.js';

export const router = express.Router();

/**
 * Valeur de retour
 * @typedef {object} RetourSignup
 * @property {string} message.required - Message
 * @property {string} userId.required - Identifiant de l'utilisateur
 */

/**
 * PUT /auth/signup
 * @summary Création d'un compte
 * @tags Authentification
 * @param {string}  name.form.required - Nom de l'utilisateur - multipart/form-data
 * @param {string} email.form.required - Email (Doit etre unique) - multipart/form-data
 * @param {string} password.form.required - Mot de passe - multipart/form-data
 * @return {RetourSignup} 200 - Succes - application/json
 */
router.put(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 }),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ],
    authController.signup
);

/**
 * Valeur de retour
 * @typedef {object} RetourLogin
 * @property {string} token.required - Jeton de connexion
 * @property {string} userId.required - Identifiant de l'utilisateur
 */

/**
 * POST /auth/login
 * @summary Connexion
 * @tags Authentification
 * @param {string} email.form.required - Email de l'utilisateur - multipart/form-data
 * @param {string} password.form.required - Mot de passe - multipart/form-data
 * @return {RetourLogin} 200 - Succes - application/json
 */
router.post('/login',[
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 }),
    ], authController.login);
