import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
//avec les imports ecmascript, on est obligé de parse le dirname nous meme...
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { validationResult } from 'express-validator';

import LigneCompta from '../models/ligneCompta.js';

const ligneComptaController = {}

/**
 * lineComptable type
 * @typedef {object} ListeLigneCompta
 * @property {string} message.required - Message de retour
 * @property {array<LigneComptable>} lignes.required - Liste des lignes 
 * @property {number} totalItems.required - Nombre total de lignes en base
 */
ligneComptaController.getLignesCompta = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    LigneCompta.find().countDocuments()
        .then(count => {
            totalItems = count;
            return LigneCompta.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage);
        }).then(lignes => {
            res
                .status(200)
                .json({ 
                    message: 'Fetched posts successfully.', 
                    lignes: lignes, 
                    totalItems: totalItems 
                });  
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

/**
 * Retour ligne type
 * @typedef {object} RetourLigneCompta
 * @property {string} message.required - Message de retour
 * @property {LigneComptable} lignes.required - Ligne concernée
 */
ligneComptaController.createLigneCompta = (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        });
    }

    let factureUrl;
    //si on a un fichier (pas obligatoire)
    if(req.file){
        factureUrl = req.file.path;
    }

    const ligneCompta = new LigneCompta({
        date: req.body.date,
        montant: req.body.montant,
        client: req.body.client,
        factureUrl: factureUrl
    });
    ligneCompta
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Ligne created successfully!',
                ligneCompta: result
            });
        })
        .catch(err => {
            console.log(err);
        });
};

ligneComptaController.getLigneCompta = (req, res, next) => {
  const ligneId = req.params.ligneId;
    LigneCompta.findById(ligneId)
    .then(ligneCompta => {
        if (!ligneCompta) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
        res.status(200).json({ message: 'Ligne fetched.', ligneCompta: ligneCompta });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

ligneComptaController.updateLigneCompta = (req, res, next) => {
    const ligneId = req.params.ligneId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    let factureUrl = req.body.factureUrl;
    if (req.file) {
        factureUrl = req.file.path;
    }
    LigneCompta.findById(ligneId)
        .then(ligneCompta => {
            if (!ligneCompta) {
                const error = new Error('Could not find ligne.');
                error.statusCode = 404;
                throw error;
            }
            if (factureUrl !== ligneCompta.factureUrl) {
                clearFacture(ligneCompta.factureUrl);
            }
            ligneCompta.date = req.body.date;
            ligneCompta.factureUrl = factureUrl;
            ligneCompta.montant = req.body.montant;
            ligneCompta.client = req.body.client;
            return ligneCompta.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Ligne updated!', ligneCompta: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

ligneComptaController.deleteLigneCompta = (req, res, next) => {
    const ligneId = req.params.ligneId;
    LigneCompta.findById(ligneId)
        .then(ligneCompta => {
            if (!ligneCompta) {
                const error = new Error('Could not find ligne.');
                error.statusCode = 404;
                throw error;
            }
            
            if(ligneCompta.factureUrl){
                clearFacture(ligneCompta.factureUrl);
            }
            return LigneCompta.findByIdAndRemove(ligneId);
        })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Deleted ligne.' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

ligneComptaController.getTotal = (req, res, next) => {
    LigneCompta.aggregate(
        [
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$montant"
                    }
                }
            }
        ],
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result[0].total); //ON recupere une avec liste avec agregate mais on aura forcément une seul valeur
            }
        }
    );
}


const clearFacture = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};

export default ligneComptaController;