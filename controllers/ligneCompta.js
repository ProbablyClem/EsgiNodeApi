
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

exports.getLigneCompta = (req, res, next) => {
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

exports.updateLigneCompta = (req, res, next) => {
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
                clearImage(ligneCompta.factureUrl);
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

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};