
const { validationResult } = require('express-validator');

const LigneCompta = require('../models/ligneCompta');

exports.getLignesCompta = (req, res, next) => {
    LigneCompta.find()
        .then(lignes => {
            res
                .status(200)
                .json({ message: 'Fetched posts successfully.', lignes: lignes });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createLigneCompta = (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        });
    }

    const ligneCompta = new LigneCompta({
        date: req.body.date,
        montant: req.body.montant,
        client: req.body.client,
        factureUrl: req.body.factureUrl
    });
    ligneCompta
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                ligneCompta: result
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getLigneCompta = (req, res, next) => {
  const ligneId = req.params.ligneId;
    LigneCompta.findById(ligneId)
    .then(ligneCompta => {
        if (!ligneCompta) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
        res.status(200).json({ message: 'Post fetched.', ligneCompta: ligneCompta });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};